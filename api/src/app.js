import express from 'express';
import cors from 'cors';
import fileRouter from './routes/file.route.js';
import imagesRouter from './routes/images.route.js';
import meetingsRouter from './routes/meetings.route.js';
import contactRouter from './routes/contact.route.js';
import footerRouter from './routes/footer.route.js';
import socialiconsRouter from './routes/socialicons.route.js';
import attendanceRouter from './routes/attendance.route.js';
import rolesRouter from './routes/roles.route.js';
import aboutRouter from './routes/about.route.js';
import loginRouter from './routes/login.route.js';
import usersRouter from './routes/users.route.js';
import referralRouter from './routes/referral.route.js';
import thanksnoteRouter from './routes/thanksGiving.route.js';
import coreleaderRouter from './routes/coreleaders.route.js';
import changepasswordRouter from './routes/changepassword.route.js';
import forgotpasswordRouter from './routes/forgotpassword.route.js';
import categoryRouter from './routes/category.route.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req,res)=>{
    res.send("Server is running");
})
app.use(express.urlencoded({ extended: true}));

app.use("/uploads", express.static("uploads"));

app.use("/api/uploads", fileRouter);
app.use("/api/uploads", imagesRouter);
app.use("/api/user", meetingsRouter);
app.use("/api/user", contactRouter);
app.use("/api/user", footerRouter);
app.use("/api/user", socialiconsRouter);
app.use("/api/user", attendanceRouter);
app.use("/api/user", rolesRouter);
app.use("/api/user", aboutRouter);
app.use("/api/user", loginRouter);
app.use("/api/user", usersRouter);
app.use("/api/user", referralRouter);
app.use("/api/user", thanksnoteRouter);
app.use("/api/user", coreleaderRouter);
app.use("/api/user", changepasswordRouter);
app.use("/api/user", forgotpasswordRouter);
app.use("/api/user", categoryRouter);

export default app;