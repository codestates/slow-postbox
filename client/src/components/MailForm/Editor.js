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

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data='<p>Hello from slow postbox!</p>'
        onChange={handleCkeditorState}
        config={{
          image: {
            resizeUnit: '%',
            resizeOptions: [
              {
                name: 'resizeImage:original',
                value: null,
                label: 'Original size',
              },
              {
                name: 'resizeImage:50',
                value: '50',
                label: 'Medium size',
              },
              {
                name: 'resizeImage:75',
                value: '75',
                label: 'Large size',
              },
            ],
            toolbar: ['resizeImage'],
          },
          ckfinder: {
            uploadUrl: 'http://localhost:4000/uploads',
          },
        }}
        className='ck-editor__ediable'
      />
    </>
  );
}
export default Editor;
