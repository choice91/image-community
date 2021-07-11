import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { storage } from "./firebase";

import { actionCreators as imageActions } from "../redux/modules/image";

import { Button } from "../elements";

const Upload = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const uploading = useSelector((state) => state.image.uploading);

  const selectFile = (e) => {
    console.log(e.target.files);
    console.log(e.target.files[0]);
    console.log(fileInput.current.files[0]);

    const reader = new FileReader();
    const file = e.target.files[0];

    // 파일 내용 읽기
    reader.readAsDataURL(file);

    // 일기가 끝나면 발생하는 이벤트 핸들러
    reader.onloadend = () => {
      // reader.result는 파일의 컨텐츠(내용물)
      // console.log(reader.result);
      dispatch(imageActions.setPreview(reader.result));
    };
  };

  const uploadFB = () => {
    // let image = fileInput.current?.files[0];
    // const _upload = storage.ref(`images/${image.name}`).put(image);

    // _upload.then((snapshot) => {
    //   console.log(snapshot);

    //   snapshot.getDownloadURL().then((url) => {
    //     console.log(url);
    //   });
    // });
    if (!fileInput.current || fileInput.current.files.length === 0) {
      window.alert("파일을 선택해주세요!");
      return;
    }
    // let image = fileInput.current.files[0];
    // console.log(image);

    dispatch(imageActions.uploadImageFB(fileInput.current.files[0]));
  };

  return (
    <>
      <input
        type="file"
        ref={fileInput}
        onChange={selectFile}
        disabled={uploading}
      />
      {/* <Button _onClick={uploadFB}>업로드하기</Button> */}
    </>
  );
};

export default Upload;
