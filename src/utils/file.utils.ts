import axios from "axios";

export const downloadFile = async (url: string, name: string) => {

  await axios.get(url, {responseType: "blob"})
             .then((response) => {
               const url = window.URL.createObjectURL(new Blob([response.data]));
               const a = document.createElement("a");
               a.href = url;
               console.log(response)
               a.download = name;
               document.body.appendChild(a);
               a.click();
               window.URL.revokeObjectURL(url);
               document.body.removeChild(a);
             })
             .catch((error) => {
               console.error("파일 다운로드 오류:", error);
             });
}
