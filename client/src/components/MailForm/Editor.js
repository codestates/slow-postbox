import { CKEditor } from 'ckeditor4-react';

function Editor() {
  return (
    <>
      <CKEditor
        name='slow-postbox'
        debug={true}
        initData={<p>Hello from CKEditor 4!</p>}
        onInstanceReady={() => {
          alert('Editor is ready!');
        }}
        editorUrl='https://cdn.ckeditor.com/4.16.2/full/ckeditor.js'
        // style={{ borderColor: "tomato" }}
      />
    </>
  );
}
export default Editor;