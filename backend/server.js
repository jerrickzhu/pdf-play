const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

let xfdf = `<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><fields><field name="topmostSubform[0]"><field name="Page1[0]"><field name="FillText30[0]"><value></value></field><field name="FillText34[0]"><value></value></field><field name="FillText4278[0]"><value></value></field><field name="CheckBox2[0]"><value>1</value></field><field name="CheckBx2[0]"><value>1</value></field><field name="CheckBox4[0]"><value>Off</value></field><field name="CheckBox217[0]"><value>Off</value></field><field name="CheckBx217[0]"><value>1</value></field><field name="FillText26[0]"><value></value></field><field name="CheckBox219[0]"><value>Off</value></field><field name="FillText21[0]"><value></value></field><field name="FillText34[1]"><value></value></field><field name="FillText30[1]"><value></value></field><field name="FillText34[2]"><value></value></field><field name="FillText30[2]"><value></value></field><field name="FillText21345341235431[0]"><value></value></field><field name="Header_sf[0]"><field name="TitlePartyName[0]"><field name="CaseName_ft[0]"><value></value></field><field name="CaseNumber_ft[0]"><value></value></field><field name="AppCaseNumber_ft[0]"><value></value></field></field><field name="AppCrtInfo_ft[0]"><field name="CheckBox23[0]"><value>Off</value></field><field name="CheckBox23[1]"><value>Off</value></field></field></field></field><field name="Page2[0]"><field name="FillText67[0]"><value></value></field><field name="FillText71[0]"><value></value></field><field name="FillText75[0]"><value></value></field><field name="FillText79[0]"><value></value></field><field name="CheckBox220[0]"><value>Off</value></field><field name="CheckBox221[0]"><value>Off</value></field><field name="SigDate[0]"><value></value></field><field name="T14[0]"><value></value></field><field name="CaptionPx_sf[0]"><field name="CaseName_sf[0]"><field name="CaseName_ft[0]"><value></value></field></field><field name="CaseNos_sf[0]"><field name="CaseNumber_ft[0]"><value></value></field><field name="AppCaseNumber_ft[0]"><value></value></field></field></field><field name="FillText67[1]"><value></value></field><field name="FillText71[1]"><value></value></field><field name="FillText75[1]"><value></value></field><field name="FillText79[1]"><value></value></field><field name="FillText67[2]"><value></value></field><field name="FillText71[2]"><value></value></field><field name="FillText75[2]"><value></value></field><field name="FillText79[2]"><value></value></field></field></field></fields><annots /><pages><defmtx matrix="1,0,0,-1,0,792" /></pages></xfdf>`
app.get('/', (req, res) => {
    const obj = {
        xfdfData: xfdf,
    }
    res.send(obj);
})



app.post('/', (req, res) => {
    console.log(req.body);
    res.send(`success! got this data: ${req.body}`);
})

app.listen(4000, () => {
    console.log("listening at 4000");
});