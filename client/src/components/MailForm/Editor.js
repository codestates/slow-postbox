import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import './Editor.css';
function Editor({ formInfo, setFormInfo }) {
  const handleCkeditorState = (event, editor) => {
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
          ckfinder: {
            uploadUrl: `http://localhost:4000/uploads`,
          },
        }}
        className='ck-editor__ediable'
      />
    </>
  );
}
export default Editor;
