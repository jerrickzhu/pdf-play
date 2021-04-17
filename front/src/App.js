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

  const delay = ms => new Promise(res => setTimeout(res, ms));

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

      instance.docViewer.on('documentLoaded', () => {
        axios.get("http://localhost:4000")
        .then(async response => {
          const xfdf = await response.data.xfdfData;
          await delay(2000);
          instance.annotManager.importAnnotations(xfdf)
          .then(res => {
            console.log("hello?")
          })
        })
      })
      

      // save button. saves all relevant data and sends to backend
      instance.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
          onClick: async () => {
            const dataTest = await annotManager.exportAnnotations( {widgets: false})
            axios.post("http://localhost:4000/data", {manualSavedData: dataTest})
            .then(async response => {
                console.log(response);
              })
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
        axios.post('http://localhost:4000', {data: form})
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

