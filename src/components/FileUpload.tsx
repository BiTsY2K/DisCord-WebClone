import React from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/SingleImageDropZone";
import { Button } from "@/components/ui/button";

type Type = "image" | "file";
type EndPoint = "publicImage" | "publicFile";

interface FileUploadProps {
  onChange: (url?: string) => void,
  type: Type
  width: number,
  height: number,
  value: string,
  endpoint: EndPoint
}

const FileUpload: React.FC<FileUploadProps> = ({ endpoint, type, width, height, value, onChange }) => {

  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div className="flex flex-col items-center space-y-2">

      <SingleImageDropzone width={width} height={height} value={file} className="min-h-0 min-w-0 rounded-full"
        onChange={(file) => { setFile(file) }}
      />
      {/* {type == "image" && (
        endpoint == "publicImage" && (
        ) 

      )} */}
  
      {/* Upload Button */}
      { file && ( 
        <Button className="w-full rounded"
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicImages.upload({
                file,
                onProgressChange: (progress) => {
                  // you can use this to show a progress bar
                  console.log(progress);
                },
              });
              // you can run some server action or api here
              // to add the necessary data to your database
              onChange(res.url);
              console.log("edge-store: ",res);
            }
          }}
        >
          Upload
        </Button>
      )}
    </div>
  )
}

export default FileUpload