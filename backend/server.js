const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:3000', credentials: true}));


let xfdf = `<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><fields><field name="topmostSubform[0]"><field name="Page1[0]"><field name="FillText30[0]"><value></value></field><field name="FillText34[0]"><value></value></field><field name="FillText4278[0]"><value></value></field><field name="CheckBox2[0]"><value>Off</value></field><field name="CheckBx2[0]"><value>Off</value></field><field name="CheckBox4[0]"><value>Off</value></field><field name="CheckBox217[0]"><value>Off</value></field><field name="CheckBx217[0]"><value>Off</value></field><field name="FillText26[0]"><value></value></field><field name="CheckBox219[0]"><value>Off</value></field><field name="FillText21[0]"><value></value></field><field name="FillText34[1]"><value></value></field><field name="FillText30[1]"><value></value></field><field name="FillText34[2]"><value></value></field><field name="FillText30[2]"><value></value></field><field name="FillText21345341235431[0]"><value></value></field><field name="Header_sf[0]"><field name="TitlePartyName[0]"><field name="CaseName_ft[0]"><value></value></field><field name="CaseNumber_ft[0]"><value></value></field><field name="AppCaseNumber_ft[0]"><value></value></field></field><field name="AppCrtInfo_ft[0]"><field name="CheckBox23[0]"><value>Off</value></field><field name="CheckBox23[1]"><value>Off</value></field></field></field></field><field name="Page2[0]"><field name="FillText67[0]"><value></value></field><field name="FillText71[0]"><value></value></field><field name="FillText75[0]"><value></value></field><field name="FillText79[0]"><value></value></field><field name="CheckBox220[0]"><value>Off</value></field><field name="CheckBox221[0]"><value>Off</value></field><field name="SigDate[0]"><value></value></field><field name="T14[0]"><value></value></field><field name="CaptionPx_sf[0]"><field name="CaseName_sf[0]"><field name="CaseName_ft[0]"><value></value></field></field><field name="CaseNos_sf[0]"><field name="CaseNumber_ft[0]"><value></value></field><field name="AppCaseNumber_ft[0]"><value></value></field></field></field><field name="FillText67[1]"><value></value></field><field name="FillText71[1]"><value></value></field><field name="FillText75[1]"><value></value></field><field name="FillText79[1]"><value></value></field><field name="FillText67[2]"><value></value></field><field name="FillText71[2]"><value></value></field><field name="FillText75[2]"><value></value></field><field name="FillText79[2]"><value></value></field></field></field></fields><annots><freetext page="0" rect="429.49,727.4800921658987,499.58304147465435,738.54" flags="print" name="2e09b7c5-fc86-7788-5d9e-8d0028b0751c" title="Guest" subject="Free Text" date="D:20210405114227-07'00'" width="0" creationdate="D:20210405114223-07'00'" TextColor="#E44234" FontSize="9"><trn-custom-data bytes="{&quot;trn-auto-size-type&quot;:&quot;auto&quot;,&quot;trn-wrapped-text-lines&quot;:&quot;[\&quot;Insert text here \&quot;]&quot;}"/><contents>Insert text here</contents><contents-richtext><body><p><span style="color:#e44234">Insert text here</span><span/></p></body></contents-richtext><defaultappearance>0 0 0 rg /Helvetica 9 Tf</defaultappearance><defaultstyle>font: Helvetica 9pt; text-align: left; color: #E44234</defaultstyle><apref-replace xmlns="http://www.w3.org/1999/xhtml"></apref-replace></freetext><text page="0" rect="35.02,445.79,66.02000000000001,476.79" color="#FFE6A2" flags="print,nozoom,norotate" name="d0d78a59-547d-c3d9-4d4f-3179ea256a82" title="Guest" subject="Note" date="D:20210405114227-07'00'" creationdate="D:20210405114227-07'00'" icon="Comment" statemodel="Review"/></annots><pages><defmtx matrix="1,0,0,-1,0,792" /></pages></xfdf>`

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