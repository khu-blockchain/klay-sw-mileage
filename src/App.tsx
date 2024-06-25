import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Global} from "@emotion/react";
import Caver from "caver-js";
import {BrowserRouter} from "react-router-dom";
import {GlobalStyle} from "@/styles/_reset";
import RootRouter from "@/RootRouter";
const queryClient = new QueryClient();

export const provider = window.klaytn;
export const caver = new Caver(provider ?? process.env.REACT_APP_API_PROVIDER_END_POINT);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Global styles={GlobalStyle}/>
        <RootRouter/>
      </BrowserRouter>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default App
