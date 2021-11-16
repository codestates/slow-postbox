import { CKEditor } from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

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
          ckfinder: {
            uploadUrl: 'http://localhost:4000/uploads',
          },
        }}
        // onChange={(event, editor) => {
        //   const data = editor.getData();
        //   console.log({ event, editor, data });
        // }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
    </>
  );
}
export default Editor;
