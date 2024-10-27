import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyB1oDwWv7mmIRe6PsyKEabya-399s_r7oc",
    authDomain: "income-expense-tracker-a8433.firebaseapp.com",
    databaseURL: "https://income-expense-tracker-a8433-default-rtdb.firebaseio.com",
    projectId: "income-expense-tracker-a8433",
    storageBucket: "income-expense-tracker-a8433.appspot.com",
    messagingSenderId: "631522745722",
    appId: "1:631522745722:web:6240163ee3992fdf8fcac3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;