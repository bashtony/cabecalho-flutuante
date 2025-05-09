import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

import { CgArrowRightR } from "react-icons/cg"
import { RiHomeLine } from "react-icons/ri";
import { AiOutlineProject } from "react-icons/ai";
import { PiCompassToolBold } from "react-icons/pi";
import { LuMenu } from "react-icons/lu";

const cabecalhoLinks = [
  { id: 0, label: 'Sobre mim', href: '#sobre-mim', className: `text-red-500`, icone: <RiHomeLine /> },
  { id: 1, label: 'Projetos', href: '#projetos', icone: <AiOutlineProject /> },
  { id: 2, label: 'Tecnologias', href: '#tecnologias', icone: <PiCompassToolBold /> },
];

function Cabecalho() {
  const [ coordenada, setCoordenada ] = useState(true);
  const { scrollY } = useScroll();

  const [ linkAtivo, setLinkAtivo ] = useState(null);
  const linkA = (id) => {
    setLinkAtivo(id);
  };

  useMotionValueEvent(scrollY, "change", (atual) => {
    let logAtual = atual - scrollY.getPrevious();
    logAtual < 0 ? setCoordenada(true) : setCoordenada(false);
  });
  
  return (
    <motion.header className="z-5000 sticky top-3 flex items-center justify-between bg-slate-900 p-4 rounded-md border border-slate-800 text-slate-100 font-bold"
      animate={{ y: coordenada ? 0 : -100, opacity: 1 }}
      initial={{ opacity: 0, y: [ -100, 0 ] }}>
      <h4 className="text-xl">@paulojsx</h4>
      <button className="text-3xl p-1 md:hidden">
        <LuMenu />
      </button>
      <nav className="hidden lg:flex lg:gap-5">
        { cabecalhoLinks.map((links) => (
            <ul key={links.id}>
              <a className={`inline-flex items-center gap-1 duration-200 h-max  ${linkAtivo === links.id ? 'text-slate-100' : 'text-slate-400'}`} 
                key={links.id}
                href={links.href}
                onClick={() => linkA(links.id)}
              >
                <span className="text-xl font-medium">{links.icone}</span>
                <li>{links.label}</li>
              </a>
            </ul>
        )) }
      </nav>
    </motion.header>
  )
}

export default Cabecalho
