"use client";
import { useState } from "react";
import { WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";

function WebcamPanel() {
  const [enabled, setEnabled] = useState(false);

  return enabled ? (
    <Webcam
      audio
      muted
      mirrored
      onUserMediaError={() => setEnabled(false)}
      style={{ height: 300, width: 300 }}
    />
  ) : (
    <>
      <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
      <Button variant="ghost" className="w-full" onClick={() => setEnabled(true)}>
        Enable Web Cam and Microphone
      </Button>
    </>
  );
}

export default WebcamPanel;
