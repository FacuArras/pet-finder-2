export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 shadow-xl bg-[#1a2631]">
      <p className="text-white text-md text-center">
        Desarrollado por{" "}
        <span className="text-[#1a82b9] ">Facundo Arrascaeta</span>
      </p>
      <ul className="text-white flex flex-row justify-center gap-6 text-2xl mt-5">
        <li>
          <a href="https://www.linkedin.com/in/facundo-arrascaeta-25260722b/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/facu.arrascaeta/">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="https://github.com/FacuArras">
            <i className="fa-brands fa-github"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
}
