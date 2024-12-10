import React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/SingleImageDropZone";
import { Button } from "@/components/ui/button";

import {
  EdgeStoreApiClientError,
  UploadAbortedError,
} from '@edgestore/react/errors';
import { formatFileSize } from "@edgestore/react/utils";
import { Progress } from "./ui/progress";
import { Plus } from "lucide-react";

type Type = "IMAGE" | "FILE";
type EndPoint = "publicImage" | "publicFile" | "SERVER_IMAGE" | "PROFILE_IMAGE";

interface FileUploadProps {
  onChange: (url?: string) => void,
  type: Type
  width: number,
  height: number,
  value: string,
  endpoint: EndPoint
}

const FileUpload: React.FC<FileUploadProps> = ({ endpoint, type, width, height, value, onChange }) => {

  const { edgestore } = useEdgeStore();
  const [file, setFile] = React.useState<File>();
  const [fileUploadError, setFileUploadError] = React.useState<string>("");
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);

  React.useEffect(() => {
    if (file) uploadFile();

    setFileUploadError(""); 
    setUploadProgress(0);      
  }, [file]);

  const uploadFile = async () => {
    try {
      if (file) {
        let edgeStoreResponse = null;
        switch (type) {
          case "IMAGE":
            edgeStoreResponse = await edgestore.serverImages.upload({ file,
              onProgressChange: (progress) => {
                setUploadProgress(progress);
                console.log(progress);
              },
            });
            break;
          case "FILE":
            edgeStoreResponse = await edgestore.publicFiles.upload({ file, 
              onProgressChange: (progress) => {
                console.log(progress);
              }
            });
            break;
        
          default:
            break;
        }
        // you can run some server action or api here
        // to add the necessary data to your database
        onChange(edgeStoreResponse?.url);
        console.log("edge-store: ",edgeStoreResponse);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error(error);

      // Upload was canceled from an AbortController's signal
      if (error instanceof UploadAbortedError) console.log('Upload aborted');

      // All errors are typed and you will get intellisense for them
      if (error instanceof EdgeStoreApiClientError) {
        switch (error.data.code) {
          // If failed due to `maxSize` set in the router config
          case 'FILE_TOO_LARGE':
            setFileUploadError(`File too large. Max size is ${
              formatFileSize(error.data.details.maxFileSize,)
            }`);            
            break;
          // IF failed due to the `accept` set in the router config
          case 'MIME_TYPE_NOT_ALLOWED':
            setFileUploadError(`File type not allowed. Allowed types are ${
              error.data.details.allowedMimeTypes.join(', ')
            }`);
            break;
          case 'SERVER_ERROR':
            // TODO: Toast Server Error
            break;
          default: console.log("FILE UPLOAD ERROR: Unknown error");
        }
      }
    }
   
  }

  return (
    <div className="flex flex-col items-center space-y-1">

      {type == "IMAGE" && (
        endpoint == "SERVER_IMAGE" && (
          <div className="relative">
            <SingleImageDropzone width={width} height={height} value={file} className="min-h-0 min-w-0 rounded-full"
              onChange={(file) => { setFile(file) }}
            />
            <div className="absolute top-0 right-0  rounded-full bg-primary text-primary-foreground pointer-events-none">
              <Plus className="h-7 w-7 p-1"/>
            </div>
          </div>
        ) 
      )}
  
      {/* Upload */}
      <div className="h-4 w-full flex flex-col items-center justify-center">
        { file && ( 
          <React.Fragment>
              {!fileUploadError && <div className="text-xs leading-4 font-medium text-destructive">{fileUploadError}</div> }
              {!!uploadProgress && <Progress value={uploadProgress} />}
            {/* <Button className="w-full rounded" onClick={uploadFile}> Upload </Button> */}
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default FileUpload