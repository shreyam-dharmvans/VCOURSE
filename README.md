# Alemeno Course Listing Website

## Getting Started

This project consists of two parts: a **Frontend** built with React and a **Backend** built with Node.js and Express.

### Steps to Run the Application

1. ##### Clone the repository:
   
   **git clone https://github.com/shreyam-dharmvans/VCOURSE.git**

   **cd VCOURSE**
   

2. ##### Open the VS Code terminal:

       ###### Navigate to the frontend folder using Command:
         cd Frontend

       ###### Install Dependencies using Command:
         npm install

       ###### Start the frontend server using Command:
          npm run dev

5. ##### The Website will be accessible at 
          http://localhost:5173 

6. ##### Notes

    ###### Backend is hosted on render.com and can be accessed using link https://vcourse.onrender.com
    ###### Since I am using Free Tier, so server can take some time to respond on first time.
    ###### To run backend locally:
    ###### 1. Create a .env file inside Backend Folder

    ###### 2. Give values in key value pairs written in .env.example file and copy paste entire .env.example file content in .env file ,created by you.

    ###### 3. In main.jsx file inside src folder
    ######    replace  axios.defaults.baseURL = 'https://vcourse.onrender.com'; 
    ######    with axios.defaults.baseURL = 'http://localhost:8080';

    ###### 4. Now open another terminal for backend
                 Navigate to Backend folder using command: 
                 cd Backend

                 Start the backend server using command:
                 nodemon app.js
 
       

   
