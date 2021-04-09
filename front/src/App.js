import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/pdfjs-express';
import './App.css';
import axios from 'axios';


const App = () => {
  const viewer = useRef(null);
  const [form, setForm] = useState([{
    // need to make it so that these are arrays or something to store more data
    name: null,
    val: null
  }])
  

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/app009.pdf',
      },
      viewer.current,
    ).then((instance) => {
      const { docViewer, Annotations } = instance;
      const annotManager = docViewer.getAnnotationManager();
      

      // save button. saves all relevant data and sends to backend
      instance.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
          onClick: async () => {
            axios.get("http://localhost:4000")
            .then(async response => {
                console.log(response.data.xfdfData);
                // const xfdf = `<?xml version="1.0" encoding="UTF-8" ?><xfdf xmlns="http://ns.adobe.com/xfdf/" xml:space="preserve"><fields><field name="topmostSubform[0]"><field name="Page1[0]"><field name="FillText30[0]"><value></value></field><field name="FillText34[0]"><value></value></field><field name="FillText4278[0]"><value></value></field><field name="CheckBox2[0]"><value>Off</value></field><field name="CheckBx2[0]"><value>Off</value></field><field name="CheckBox4[0]"><value>Off</value></field><field name="CheckBox217[0]"><value>Off</value></field><field name="CheckBx217[0]"><value>Off</value></field><field name="FillText26[0]"><value></value></field><field name="CheckBox219[0]"><value>Off</value></field><field name="FillText21[0]"><value></value></field><field name="FillText34[1]"><value></value></field><field name="FillText30[1]"><value></value></field><field name="FillText34[2]"><value></value></field><field name="FillText30[2]"><value></value></field><field name="FillText21345341235431[0]"><value></value></field><field name="Header_sf[0]"><field name="TitlePartyName[0]"><field name="CaseName_ft[0]"><value></value></field><field name="CaseNumber_ft[0]"><value></value></field><field name="AppCaseNumber_ft[0]"><value></value></field></field><field name="AppCrtInfo_ft[0]"><field name="CheckBox23[0]"><value>Off</value></field><field name="CheckBox23[1]"><value>Off</value></field></field></field></field><field name="Page2[0]"><field name="FillText67[0]"><value></value></field><field name="FillText71[0]"><value></value></field><field name="FillText75[0]"><value></value></field><field name="FillText79[0]"><value></value></field><field name="CheckBox220[0]"><value>Off</value></field><field name="CheckBox221[0]"><value>Off</value></field><field name="SigDate[0]"><value></value></field><field name="T14[0]"><value></value></field><field name="CaptionPx_sf[0]"><field name="CaseName_sf[0]"><field name="CaseName_ft[0]"><value></value></field></field><field name="CaseNos_sf[0]"><field name="CaseNumber_ft[0]"><value></value></field><field name="AppCaseNumber_ft[0]"><value></value></field></field></field><field name="FillText67[1]"><value></value></field><field name="FillText71[1]"><value></value></field><field name="FillText75[1]"><value></value></field><field name="FillText79[1]"><value></value></field><field name="FillText67[2]"><value></value></field><field name="FillText71[2]"><value></value></field><field name="FillText75[2]"><value></value></field><field name="FillText79[2]"><value></value></field></field></field></fields><annots><text page="0" rect="55.98,457.61,86.97999999999999,488.61" color="#FFE6A2" flags="print,nozoom,norotate" name="8cd084a1-e613-de47-3e77-0a71ebd49c84" title="Guest" subject="Note" date="D:20210409083047-07'00'" creationdate="D:20210409083047-07'00'" icon="Comment" statemodel="Review"/></annots><pages><defmtx matrix="1,0,0,-1,0,792" /></pages></xfdf>`
                const xfdf = response.data.xfdfData;
                // console.log(xfdf === response.data.xfdfData);
                const fileData = await docViewer.getDocument().getFileData({});

                const blob = new Blob([fileData], { type: 'application/json' });

                let data = new FormData();
                data.append('xfdf', xfdf);
                data.append('file', blob);
                data.append('license', '');

                const res = await fetch('https://api.pdfjs.express/xfdf/merge', {
                  method: 'post',
                  body: data
                }).then(resp => resp.json());

                const { url, key, id } = res;

                console.log(url);

                const mergedFileBlob = await fetch(url, {
                  headers: {
                    Authorization: key
                  }
                }).then(resp => resp.blob());

                instance.loadDocument(mergedFileBlob);
              })
            // annotManager.exportAnnotCommand()
            // .then(xfdf => {
            //   const dataObj = {
            //     xfdfString: xfdf,
            //     formData: form
            //   }
            //   axios.post("http://localhost:4000", {data: dataObj})
            //   .then(response => {
            //     console.log(response.data);
            //   })
            // })
          
            // MERGE CODE BELOW. 
            // sends get request to backend,
            // which sends in xfdf data that I manually made
            // as a variable in server.js
            // problem is that once you try to load the blob
            // it gets caught in some promise error??? 
          }
        });
      });
      
      
      // listens for a form to change. Once it does
      // this will capture the data and save it until
      // the user sends the data off.
      annotManager.on("fieldChanged", (field, value) => {
        // from what I understand, there isn't any "ID" associated with
        // the fields. However, the names are unique from what it seems...
        console.log("field changed: " + field.name + ', ' + value);
        let newArr = [...form]
        newArr[0].name = field.name;
        newArr[0].val = value;
        setForm(newArr);

        console.log(form);
      })
      

      // this code below just listens to any annotations made. it could
      // be handy if we wanted to implement an autosave system.
      annotManager.on('annotationChanged', async (annotations, action) => {
        if (action === 'add') {
          console.log("hello")
          console.log(annotations);
          

        
          // axios
          // .post("http://localhost:4000", {INSERT DATA TO SEND FOR AUTOSAVE})
          // .then(response => {
          //   console.log(response);
          // })
        }
      })

    });
  }, []);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;

