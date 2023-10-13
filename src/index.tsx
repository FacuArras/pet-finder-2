import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import MyRoutes from "./router";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";

const root = createRoot(document.querySelector("#root"));

root.render(
  <RecoilRoot>
    <Suspense
      fallback={
        <div className="flex justify-center h-screen items-center">
          <div className="loader"></div>
        </div>
      }
    >
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </Suspense>
  </RecoilRoot>
);
