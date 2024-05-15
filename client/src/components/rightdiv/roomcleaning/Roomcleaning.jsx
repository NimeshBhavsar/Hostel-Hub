import React, { useState } from 'react';
import './roomcleaning.css';
import axios from "axios";
import { useSelector } from 'react-redux';

function Roomcleaning(props) {
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
  setContentText("Instructions are set.");
  setComments(message.slice(20, message.length));
}

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir, How May I Help You?");
    }
    else if(message.includes("set instructions as")){
      speak("Setting the Cleaning Request Instructions");
      setSpokenContent(message);
      handlesetComments(message);
    }
    else if(message.includes("submit request")){
      buttonElement.click();
      setSpokenContent(message);
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
          const res = await axios.post("/api/cleaningreq/register", 
            { 
              studentRegNo: student.studentRegNo,
              room_number: student.room_number,
              studentComments: comments,
              isStudent: true
            }
          );
          setComments("");
          if(res.status===200){
            alert("Cleaning Request Submitted Successfully 😊");
          }
        } catch (error) {
          // console.log(error);
          alert("Could not register your cleaning request! 🙁\n\nYour last request is already in Queue, you can only put a new one when the previous one is completed.\nOr\nYou are not connected to internet.");
        }
      } else {
        console.log("Student not signed in!");
      }
    }

    return (
      <>
        { toShow 
            ? <div className='roomcleaningwrapper'>
                <h1 className='title'>Room Cleaning</h1>
                <form className='roomcleaningForm' onSubmit={handleSubmit}>
                  <p name="studName" className='studentdetails'>Name: {student.studentName}</p>
                  <p name="studRoomNo" className='studentdetails'>Hostel Block - Room No.: {student.hostelBlockName}-{student.room_number}</p>

                    {/* <p name="studName" className='studentdetails'>Reg. No.: {student.studentRegNo}</p>
                    <p name="studRoomNo" className='studentdetails'>Hostel Block: {student.hostelBlockName}</p>
                    <p name="studRoomNo" className='studentdetails'>Floor No.: {student.hostelFloorNo}</p>
                    <p name="studRoomNo" className='studentdetails'>Room Number: {student.room_number}</p>
                    <p name="studPhoneNo" className='studentdetails'>Phone Number: {student.studentPhone_no}</p>
                    <p name="studEmailId" className='studentdetails'>Email: {student.studentEmail}</p> */}
                    <textarea name="comments" placeholder='Any instructions?' className='complaintInput' value={comments} onChange={(e) => setComments(e.target.value)} ></textarea>
                    <button type="submit" className='complaintButton' id="complaintButtonId">Submit Request</button> 
                </form>
                <div className="voiceInput">
                  <button className="talk" onClick={handleVoiceClick}>
                    <i className="fas fa-microphone-alt">
                    </i>
                    <span className="iconText">Click here to speak</span>
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

export default Roomcleaning;