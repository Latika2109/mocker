"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm'; // Ensure eq is imported
import { Lightbulb, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';

function Interview({ params }) {
  const [unwrappedParams, setUnwrappedParams] = useState(null);
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  // Unwrap the params if it's a promise
  useEffect(() => {
    if (params) {
      params.then((unwrapped) => {
        setUnwrappedParams(unwrapped);
      });
    }
  }, [params]);

  // Fetch interview details when unwrappedParams is available
  useEffect(() => {
    if (unwrappedParams?.interviewId) {
      console.log(unwrappedParams.interviewId);
      GetInterviewDetails();
    }
  }, [unwrappedParams]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, unwrappedParams.interviewId));
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
       
         {/* Interview Details Section */}
        <div className="flex flex-col my-5 gap-5">
          <div className='p-5 rounded-lg border flex flex-col gap-5'>
          <h2 className="text-lg">
            <strong>Job Role/Job Position:</strong> {interviewData?.jobPosition}
          </h2>

          <h2 className="text-lg">
            <strong>Job Description/Tech Stack:</strong>{' '}
            {interviewData?.jobDesc}
          </h2>

          <h2 className="text-lg">
            <strong>Years of Experience:</strong> {interviewData?.jobExperience}
          </h2>
        </div>
        <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
          <h2 className='flex gap-2 items-center text-yellow-600'>
           <Lightbulb />
          <strong>Information</strong> 
          </h2>
          
          <h2 className='mt-3 text-yellow-500'>
            {process.env.NEXT_PUBLIC_INFORMATION}
          </h2>
        </div>
      </div>

         {/* Webcam Section */}
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button variant='ghost' className='w-full' onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='flex justify-end items-end'>
        <a href={`/dashboard/interview/${unwrappedParams?.interviewId}/start`}>
      <Button className='flex'>
        Start Interview
      </Button>
      </a>

      </div>
      
    </div>
  );
}

export default Interview;

       
