import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import './Editor.css';




function Editor({ formInfo, setFormInfo }) {
  const handleCkeditorState = (evnet, editor) => {
    const data = editor.getData();
    setFormInfo({
      ...formInfo,
      content: data,
    });
    console.log(data);
  };

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${process.env.REACT_APP_SERVER_API}/upload_files`, {
              method: "post",
              body: body
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${process.env.REACT_APP_SERVER_API}/${res.filename}`
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }


  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data='<p>Hello from slow postbox!</p>'
        onChange={handleCkeditorState}
        config={{
          extraPlugins: [uploadPlugin]
        }}
        className='ck-editor__ediable'
      />
    </>
  );
}
export default Editor;
