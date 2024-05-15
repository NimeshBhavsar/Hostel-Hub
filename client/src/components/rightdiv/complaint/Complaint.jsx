import React, { useEffect, useRef, useState } from 'react';
import './complaint.css';
import axios from "axios";
import { useSelector } from 'react-redux';

function Complaint(props) {

    const toShow = props.show;
    const [comments, setComments] = useState("");
    const [spokenContent, setSpokenContent] = useState("");
    const [contentText, setContentText] = useState(" Recognised command appears here.");
    const buttonElement = document.getElementById("complaintButtonId");

    function speak(text){
      const text_speak = new SpeechSynthesisUtterance(text);
  
      text_speak.rate = 1;
      text_speak.volume = 1;
      text_speak.pitch = 1;
  
      window.speechSynthesis.speak(text_speak);
  }
  
  function wishMe(){
      speak("Listening")
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition =  new SpeechRecognition();

  recognition.onresult = (event)=> {
      const currentIndex = event.resultIndex;
      const transcript = event.results[currentIndex][0].transcript;
      setContentText(transcript);
      takeCommand(transcript.toLowerCase());
  }

const handleVoiceClick = () => {
    wishMe();
    setContentText("Listening...");
    recognition.start();
}
const handlesetComments = (message) => {
  setContentText("Comments are set.");
  setComments(message.slice(17,message.length));
}

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir, How May I Help You?");
    }
    else if(message.includes("set complaint as")){
      speak("Setting the Complaint Comments");
      setSpokenContent(message);
      handlesetComments(message);
    }
    else if(message.includes("submit complaint")){
      speak("Complaint submitted.");
      setSpokenContent(message);
      buttonElement.click();
      setContentText("Complaint submitted.");
    }
    else {
        speak("Could not Recognise");
    }
}

    const student = useSelector((state) => {
      return state.Reducers.user;
    });
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(student){
        try {
          const res = await axios.post("/api/complaint/register", 
            { 
              studentRegNo: student.studentRegNo,
              room_number: student.room_number,
              studentComments: comments,
              isStudent: true
            }
          );
          setComments("");
          if(res.status===200){
            alert("Complaint Submitted Successfully 😊");
          } 
        } catch (error) {
          alert("Could not register your complaint! 🙁\n\nYour last complaints are already in Queue, you can put 3 complaints at maximum.\nOr\nYou are not connected to internet.");
        }
      } else {
        console.log("Student not signed in!");
      }
      
    }

    return (
      <>
        { toShow 
            ? <div className='complaintwrapper'>
                <h1 className='title'>Complaint</h1>
                <form className='complaintForm' onSubmit={handleSubmit}>
                    <p name="studName" className='studentdetails'>Name: {student.studentName}</p>
                    {/* <p name="studName" className='studentdetails'>Reg. No.: {student.studentRegNo}</p> */}
                    <p name="studRoomNo" className='studentdetails'>Hostel Block - Room No.: {student.hostelBlockName}-{student.room_number}</p>
                    {/* <p name="studRoomNo" className='studentdetails'>Floor No.: {student.hostelFloorNo}</p> */}
                    {/* <p name="studRoomNo" className='studentdetails'>Room Number: {student.room_number}</p> */}
                    {/* <p name="studPhoneNo" className='studentdetails'>Phone Number: {student.studentPhone_no}</p> */}
                    {/* <p name="studEmailId" className='studentdetails'>Email: {student.studentEmail}</p> */}
                    <textarea name="comments" placeholder='Please explain your Complaint.' className='complaintInput' value={comments} onChange={(e) => setComments(e.target.value)} required></textarea>
                    <button type="submit" className='complaintButton' id="complaintButtonId">Submit Complaint</button>
                </form>
                <div className="voiceInput">
                  <button className="talk" onClick={handleVoiceClick}>
                    <i className="fas fa-microphone-alt">
                    </i>
                    <span className="iconText">Click here to speak.</span>
                  </button>
                  <h1 className="content">{contentText}</h1>
                </div>
                <span className='speechRecog'>Speech Recognition: {spokenContent}</span>
              </div> 
            : <></> 
        }
      </>
        
    )
}

export default Complaint;