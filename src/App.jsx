import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. 在这里引入了 Github 图标
import { Sun, Moon, Volume2, VolumeX, Globe, Terminal, LayoutDashboard, Briefcase, FileText, MessageSquare, SkipBack, SkipForward, Github, ChevronLeft, ChevronRight, ChevronDown, BookHeart,Coffee, Command, ExternalLink} from 'lucide-react';
import myAvatar from './assets/lxx.jpg'; // 根据实际路径调整

import background1 from './assets/project-covers/1-cover.jpg';
import background2 from './assets/project-covers/2-cover.jpg';
import background3 from './assets/project-covers/3-cover.jpg';
import background4 from './assets/project-covers/4-cover.jpg';
import background5 from './assets/project-covers/5-cover.jpg';
import background6 from './assets/project-covers/6-cover.jpg';

import { wikiData } from './learningData'; // <--- 新增学习内容总结

// --- 2. 自定义社交图标组件 (新增部分) ---

const BilibiliIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M17.813 4.653h.854c1.51.054 2.769 1.313 2.823 2.823v11.936c-.054 1.51-1.313 2.769-2.823 2.823H5.334c-1.51-.054-2.769-1.313-2.823-2.823V7.476c.054-1.51 1.313-2.769 2.823-2.823h.854l-2.008-2.678.895-.672 2.378 3.17h8.1l2.378-3.17.895.672-2.013 2.678zM5.6 10.973v4.472h2.4v-4.472H5.6zm10.4 0v4.472h2.4v-4.472H16z"
    />
  </svg>
);

// ... 其他代码 ...

const XHSIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.8 4.5c-.9 0-1.7.5-2.1 1.2-.4-.7-1.2-1.2-2.1-1.2-1.3 0-2.4 1.1-2.4 2.4 0 .5.2 1 .5 1.3L11 12l-2.7-3.8c.3-.3.5-.8.5-1.3 0-1.3-1.1-2.4-2.4-2.4-.9 0-1.7.5-2.1 1.2-.4-.7-1.2-1.2-2.1-1.2C.9 4.5 0 5.6 0 6.9c0 .5.2 1 .5 1.3L5 12.8c-1.1 1.6-1.7 3.5-1.7 5.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.9-.2-1.7-.6-2.5L13.4 12l2.7 3.8c-.3.3-.5.8-.5 1.3 0 1.3 1.1 2.4 2.4 2.4.9 0 1.7-.5 2.1-1.2.4.7 1.2 1.2 2.1 1.2 1.3 0 2.4-1.1 2.4-2.4 0-.5-.2-1-.5-1.3l-2.7-3.8c1.1-1.6 1.7-3.5 1.7-5.5 0-2.2-1.8-4-4-4z"/>
  </svg>
);

// --- 模拟数据与语言包 ---
const i18n = {
  CN: {
    nav: { home: '概览', notes: '档案', projects: '工程', board: '频段' },
    status: '系统正常',
    job: '前端工程师',
    day: '日间模式',
    night: '夜间模式',
  },
  EN: {
    nav: { home: 'DASHBOARD', notes: 'ARCHIVES', projects: 'PROJECTS', board: 'SIGNAL' },
    status: 'SYSTEM NORMAL',
    job: 'FRONTEND ENG.',
    day: 'VISOR: ON',
    night: 'VISOR: OFF',
  }
};

// --- 子页面组件：经过视觉重构的 Dashboard ---
const Dashboard = ({ lang, theme }) => (
  <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between p-2 md:p-0 overflow-y-auto md:overflow-hidden">
    
    {/* 左侧：高密度信息区 */}
    <div className="flex flex-col justify-center z-10 w-full md:w-1/2 space-y-6 md:pl-4">
      
      {/* 顶部 Tag */}
      <div className="flex items-center gap-2">
        <span className="bg-end-yellow text-black px-2 py-0.5 text-xs font-bold font-mono">ADMIN_01</span>
        <span className={`text-xs font-mono tracking-widest ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            // PERMISSION GRANTED
        </span>
      </div>

      {/* 巨型标题 - 强对比设计 */}
      <div>
        <h1 className={`text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          卢布朗咖啡店
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-end-yellow italic">
          // PERSONA PROTOCOL
        </h2>
        <h3 className="text-1xl md:text-2xl font-bold text-end-gray italic">
          Email:1172587551@qq.com
        </h3>
        <h4 className="text-1xl md:text-2xl font-bold text-end-gray italic">
         Tel:114514
        </h4>   
      </div>

      {/* 简介文本块 - 增加背景框 */}
      <div className={`border-l-4 pl-6 py-4 max-w-md backdrop-blur-sm transition-colors duration-500
        ${theme === 'light' ? 'border-gray-800 bg-white/60 text-gray-800' : 'border-end-yellow bg-black/30 text-gray-300'}`}>
        <p className="font-mono text-sm leading-relaxed font-bold">
          {lang === 'CN' ? '卢布朗咖啡店 // 个人终端' : 'LEBLANC COFFEE // PERSONAL TERMINAL'}
        </p>
        <p className="font-mono text-xs mt-2 opacity-80 leading-relaxed">
          {lang === 'CN' 
            ? '欢迎来到控制台。当前环境参数稳定。正在执行：[个人数据归档] 任务。' 
            : 'WELCOME TO THE CONSOLE. PARAMETERS STABLE. EXECUTING: [DATA ARCHIVING].'}
        </p>
        <div className="mt-4 flex gap-4 text-[10px] font-mono">
            <span className="text-end-cyan">> STATUS: ONLINE</span>
            <span className="text-end-cyan">> SYNC: 100%</span>
        </div>
      </div>

      {/* 底部装饰数据流 */}
      <div className={`font-mono text-[10px] space-y-1 pt-4 hidden md:block ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`}>
        <div>> CPU_LOAD: 12% ............ OK</div>
        <div>> MEM_ALLOC: 4096MB ........ OK</div>
        <div>> UPTIME: 4200H 21M ........ OK</div>
      </div>
    </div>

    {/* 右侧：视觉卡片区 (模仿角色立绘位) */}
    <div className="relative w-full md:w-1/2 h-[400px] md:h-full flex items-center justify-center mt-8 md:mt-0">
       
       {/* 卡片外框装饰 */}
       <div className={`absolute inset-4 md:inset-10 border-2 border-dashed rounded-lg opacity-30 pointer-events-none
           ${theme === 'light' ? 'border-gray-400' : 'border-gray-600'}`}></div>
       
       {/* 核心卡片容器 */}
       <div className={`relative w-64 h-80 md:w-80 md:h-96 transition-all duration-500 group overflow-hidden border transform hover:-translate-y-2 hover:shadow-2xl
          ${theme === 'light' ? 'bg-white shadow-xl border-gray-300' : 'bg-[#1a1a1a] shadow-2xl border-gray-600'}`}>
          
          {/* 顶部黄色条 */}
          <div className="h-2 w-full bg-end-yellow"></div>
          
          {/* 卡片内容 */}
          <div className="p-6 h-full flex flex-col relative">
             <div className={`absolute top-4 right-4 text-4xl font-black select-none opacity-20 ${theme === 'light' ? 'text-black' : 'text-white'}`}>01</div>
             
             {/* 头像与社交图标区域 */}
             {/* 修改：添加 flex-col 让图标换行显示在下方 */}
             <div className="flex-1 flex flex-col items-center justify-center">
                
                {/* 头像 */}
                <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center relative
                    ${theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-gray-700 bg-black'}`}>
                    <div className="absolute inset-[-4px] border-l-2 border-t-2 border-end-yellow rounded-full animate-[spin_4s_linear_infinite]"></div>
                    <img 
                      src={myAvatar} 
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover z-10" 
                    />
                </div>

                {/* 3. 新增：社交媒体图标栏 */}
                <div className="flex items-center justify-center gap-5 mt-6 z-20">
                    {/* Bilibili */}
                    <a href="https://space.bilibili.com/39234967?spm_id_from=333.1387.0.0" target="_blank" rel="noopener noreferrer"
                       className={`transition-transform hover:scale-110 hover:text-end-yellow duration-300 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <BilibiliIcon className="w-6 h-6" />
                    </a>

                    {/* Github */}
                    <a href="https://github.com/SwearToMyBones" target="_blank" rel="noopener noreferrer"
                       className={`transition-transform hover:scale-110 hover:text-end-yellow duration-300 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Github size={24} />
                    </a>

                    {/* 小红书 */}
                    <a href="https://www.xiaohongshu.com/user/profile/63200e500000000023024f15" target="_blank" rel="noopener noreferrer"
                       className={`transition-transform hover:scale-110 hover:text-end-yellow duration-300 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <BookHeart className="w-6 h-6" />
                    </a>
                </div>

             </div>

             {/* 底部信息 */}
             <div className="mt-auto z-10">
               <div className="text-xs font-mono text-end-yellow mb-1">DESIGNATION</div>
               <div className={`text-xl font-bold uppercase ${theme === 'light' ? 'text-black' : 'text-white'}`}>Administrator</div>
               <div className="w-full bg-gray-200/20 h-1 mt-2 overflow-hidden">
                 <div className="h-full bg-end-yellow w-2/3 animate-pulse"></div>
               </div>
             </div>
          </div>

          {/* 悬停扫描光效 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-end-yellow/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
       </div>

       {/* 浮动标签 */}
       <div className="absolute right-0 md:right-10 bottom-20 bg-end-yellow text-black font-bold font-mono text-xs py-1 px-3 transform rotate-90 origin-bottom-right shadow-lg">
         PROJECT_ENDFIELD
       </div>
    </div>
  </div>
);

const projectDocs = [
  {
    id: 'UE5_GAS学习',
    title: 'DOC_01',
    description: '个人关于GAS学习文档总结.',
    image: background1,
    link: 'https://bcnqk7n0fhvi.feishu.cn/wiki/Z0yzwHzqhiBILJk7DsocEENknqe',
    tags: ['Project', 'UE5', 'GAS'],
  },
  {
    id: 'UE5背包系统学习',
    title: 'DOC_02',
    description: '个人关于背包系统学习文档总结.',
    image: background2,
    link: 'https://bcnqk7n0fhvi.feishu.cn/wiki/HIr7wGWeIim2YgkV33FcjNsEnIe',
    tags: ['Notes', 'Review', 'Archive'],
  },
  {
    id: '洗牌算法',
    title: 'DOC_03',
    description: '关于洗牌算法的总结.',
    image: background3,
    link: 'https://bcnqk7n0fhvi.feishu.cn/wiki/D9hBw56Pjioc4ukcU7Mco7eHnrc',
    tags: ['Project', 'Public Link', 'Read'],
  },
  {
    id: '第三人称锁定',
    title: 'DOC_04',
    description: '第三人称模式战斗锁定敌人机制分析.',
    image: background4,
    link: 'https://bcnqk7n0fhvi.feishu.cn/wiki/Jf65wtlGsiRIKukPtjGcIxOenGb',
    tags: ['Draft', 'Feishu', 'Soon'],
  },
  {
    id: 'U3D玩法研究',
    title: 'DOC_05',
    description: 'Unity中3D和2D场景下的切换.',
    image: background5,
    link: 'https://bcnqk7n0fhvi.feishu.cn/wiki/CxApwr0A4iNVaAkxJqccplOInQc',
    tags: ['Draft', 'Archive', 'Soon'],
  },
  {
    id: 'placeholder-06',
    title: 'DOC_06',
    description: 'Reserved slot for notes, reviews, or learning logs.',
    image: background6,
    link: '#',
    tags: ['Draft', 'Notes', 'Soon'],
  },
];

const Projects = () => {
  const scrollerRef = useRef(null);

  const scrollProjects = (direction) => {
    if (!scrollerRef.current) return;
    const firstCard = scrollerRef.current.querySelector('a');
    const gap = 16;
    const distance = firstCard ? firstCard.offsetWidth + gap : scrollerRef.current.clientWidth;

    scrollerRef.current.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative h-[70vh]">
      <button
        type="button"
        onClick={() => scrollProjects(-1)}
        className="absolute left-0 top-1/2 z-20 hidden h-12 w-10 -translate-y-1/2 items-center justify-center border border-end-yellow/70 bg-black/70 text-end-yellow backdrop-blur-md transition-all hover:bg-end-yellow hover:text-black md:flex"
        aria-label="Previous projects"
      >
        <ChevronLeft size={22} />
      </button>

      <div
        ref={scrollerRef}
        className="flex h-full gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory p-2 md:px-12 custom-scrollbar"
      >
        {projectDocs.map((project, index) => (
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            key={project.id}
            href={project.link}
            target={project.link === '#' ? undefined : '_blank'}
            rel={project.link === '#' ? undefined : 'noopener noreferrer'}
            className="group relative flex min-h-[520px] w-full flex-shrink-0 snap-start cursor-pointer flex-col overflow-hidden border border-gray-600 bg-white/5 transition-all hover:border-end-yellow hover:bg-white/10 md:w-[calc((100%-1rem)/2)] xl:w-[calc((100%-2rem)/3)] [content-visibility:auto] [contain-intrinsic-size:520px_360px]"
          >
            <div className="relative aspect-[1/1] w-full overflow-hidden bg-black/30">
              <img
                src={project.image}
                alt={project.title}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
                draggable="false"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center border border-end-yellow bg-black/70 text-end-yellow">
                <ExternalLink size={16} />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="border border-end-yellow/40 px-2 py-0.5 text-[10px] font-mono text-end-yellow">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-mono text-xl font-bold mb-2 group-hover:text-end-yellow transition-colors">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-70">
                {project.description}
              </p>

              <div className="mt-auto pt-6">
                <div className="flex items-center justify-between text-[10px] font-mono opacity-60">
                  <span>{project.link === '#' ? 'DOCUMENT_SLOT_RESERVED' : 'OPEN_FEISHU_DOCUMENT'}</span>
                  <span>DOC_{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="mt-2 h-1 w-full bg-gray-700">
                  <div className="h-full w-2/3 bg-end-yellow transition-all duration-500 group-hover:w-full"></div>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollProjects(1)}
        className="absolute right-0 top-1/2 z-20 hidden h-12 w-10 -translate-y-1/2 items-center justify-center border border-end-yellow/70 bg-black/70 text-end-yellow backdrop-blur-md transition-all hover:bg-end-yellow hover:text-black md:flex"
        aria-label="Next projects"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
};

// src/App.jsx

// --- 修改后的 Notes 组件：带右侧目录 ---
const Notes = ({ theme }) => {
  const [activeDoc, setActiveDoc] = useState(wikiData[0].items[0]);
  
  // 展开/收起状态
  const [openCategories, setOpenCategories] = useState(
    new Array(wikiData.length).fill(true)
  );

  const toggleCategory = (index) => {
    const newState = [...openCategories];
    newState[index] = !newState[index];
    setOpenCategories(newState);
  };

  // 👇 跳转功能的实现
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // smooth 滚动到对应位置
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      
      {/* 1. 左侧：侧边栏导航 (保持不变，宽度稍作调整) */}
      <div className={`w-64 h-full overflow-y-auto border-r custom-scrollbar pr-2 flex-shrink-0
        ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'}`}>
        
        {wikiData.map((cat, index) => (
          <div key={index} className="mb-4">
            <button 
              onClick={() => toggleCategory(index)}
              className={`flex items-center w-full text-left mb-3 select-none group transition-all
                ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}
              `}
            >
              <span className={`mr-2 transition-transform duration-200 ${openCategories[index] ? 'rotate-90' : 'rotate-0'} opacity-40`}>
                <ChevronRight size={16} />
              </span>
              <div className="flex items-baseline gap-3 group-hover:translate-x-1 transition-transform duration-300">
                <span className="font-mono text-xs text-end-yellow font-bold opacity-60">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <span className="font-bold text-base tracking-wider uppercase font-mono">
                  {cat.category}
                </span>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {openCategories[index] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={`space-y-0.5 ml-2 pl-2 border-l ${theme === 'light' ? 'border-gray-300' : 'border-gray-800'}`}>
                    {cat.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveDoc(item)}
                        className={`w-full text-left px-4 py-1.5 text-sm font-mono transition-all border-l-2 truncate
                          ${activeDoc.id === item.id 
                            ? 'border-end-yellow text-end-yellow bg-end-yellow/10' 
                            : 'border-transparent opacity-60 hover:opacity-100 hover:bg-white/5'
                          }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* 2. 中间：阅读区域 + 3. 右侧：目录区域 (Flex布局) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 中间：文章内容 (flex-1 占满剩余空间) */}
        <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6 scroll-smooth">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeDoc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="prose prose-invert max-w-4xl" // 限制最大宽度，防止太宽难读
            >
              {activeDoc.content}
              
              <div className="w-full h-px bg-gray-700 mt-12 mb-4"></div>
              <div className="text-[10px] font-mono opacity-40">END OF DOCUMENT // ID: {activeDoc.id.toUpperCase()}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. 右侧：目录 (TOC) - 仅在有目录数据时显示 */}
        {activeDoc.toc && activeDoc.toc.length > 0 && (
          <div className={`w-48 hidden xl:block h-full overflow-y-auto p-6 border-l
            ${theme === 'light' ? 'border-gray-300 bg-gray-50/50' : 'border-gray-800 bg-black/20'}`}>
            
            <div className="text-xs font-mono font-bold text-end-yellow mb-4 tracking-widest opacity-80">
              // CATALOG
            </div>
            
            <div className="space-y-2 relative">
              {/* 装饰线 */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-700/30"></div>

              {activeDoc.toc.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left text-xs font-mono py-1 pl-3 border-l-2 border-transparent transition-all
                    ${theme === 'light' 
                      ? 'text-gray-500 hover:text-black hover:border-gray-400' 
                      : 'text-gray-500 hover:text-white hover:border-end-yellow'
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

// --- 主应用组件 ---
export default function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('EN'); 
  const [activeTab, setActiveTab] = useState('home');
  const [time, setTime] = useState(new Date());

  const [volume, setVolume] = useState(0.3)
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); 
  const audioRef = useRef(null);

  // 🎵 歌单
  const playlist = [
    { title: "Idle and the Real", src: "Idle and the Real-小西利树.mp3" },
    { title: "Life Will Change", src: "life goes on-目黑将司.mp3" }, // 示例，请确认文件名
    { title: "Beneath the Mask", src: "Lyn - Beneath the Mask -rain-.mp3" }, 
  ];

  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const playPrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  useEffect(() => {
    if (audioPlaying && audioRef.current) {
      setTimeout(() => audioRef.current.play(), 50);
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: 'home', icon: <LayoutDashboard size={18} />, label: i18n[lang].nav.home },
    { id: 'notes', icon: <FileText size={18} />, label: i18n[lang].nav.notes },
    { id: 'projects', icon: <Briefcase size={18} />, label: i18n[lang].nav.projects },
    { id: 'guestbook', icon: <MessageSquare size={18} />, label: i18n[lang].nav.board },
  ];

  return (
    <div className={`w-screen h-screen flex flex-col overflow-hidden relative selection:bg-end-yellow selection:text-black transition-colors duration-500 ${theme === 'light' ? 'text-end-dark' : 'text-white'}`}>
      
      {/* --- 👇 背景层重构：增加 Day Mode 下的丰富度 👇 --- */}
      
      {/* 1. 基础底色 (Day Mode 使用纯净的浅灰，避免过白刺眼) */}
      <div className={`fixed inset-0 z-[-2] transition-colors duration-500 ${theme === 'light' ? 'bg-[#F0F0F0]' : 'bg-[#0F0F0F]'}`}></div>

      {/* 2. 装饰性巨型文字水印 (Day Mode 下特别明显，增加层次)
      
      <div className={`fixed top-[-5%] left-[-5%] text-[20vw] font-black leading-none select-none z-[-1] transition-opacity duration-500 overflow-hidden whitespace-nowrap pointer-events-none
          ${theme === 'light' ? 'text-gray-300 opacity-80' : 'text-[#1a1a1a] opacity-50'}`}>
          ENDFIELD
      </div>
       */}

      {/* 3. 右侧黄色装饰色块 (模仿参考图的侧边栏设计) */}
      <div className={`fixed top-0 bottom-0 right-[15%] w-[1px] z-[-1] transition-colors duration-500 ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-800'}`}></div>
      <div className={`fixed top-1/4 right-0 w-[20vw] h-[120vh] z-[-2] transform skew-x-[-15deg] translate-x-1/2 transition-colors duration-500
          ${theme === 'light' ? 'bg-end-yellow/10' : 'bg-end-yellow/5'}`}></div>

      {/* 4. 网格与噪点 */}
      <div className="fixed inset-0 z-[-1] bg-isometric-grid opacity-[0.06] pointer-events-none"></div>
      <div className="bg-noise"></div>
      
      {/* 5. 装饰性 HUD 元素 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="scanline"></div>
          <div className={`absolute bottom-8 left-24 font-mono text-[10px] opacity-40 hidden md:block leading-tight tracking-widest ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              // GEO_LOC: 30.274° N, 120.155° E<br/>
              // SERVER_NODE: HANGZHOU_03<br/>
              // PROTOCOL: ENDFIELD_SECURE_V4
          </div>
          <div className="absolute top-20 right-8 w-64 h-64 border border-end-yellow/10 rounded-full opacity-20 border-dashed animate-[spin_60s_linear_infinite]"></div>
      </div>
      
      {/* --- 👆 背景层重构 END 👆 --- */}

      {/* 顶部 HUD 栏 */}
      <header className={`h-16 border-b flex justify-between items-center px-6 z-20 backdrop-blur-md transition-colors duration-500
        ${theme === 'light' ? 'bg-white/40 border-gray-300' : 'bg-black/40 border-gray-700/50'}`}>
        <div className="flex items-center gap-4">
         <div className="w-10 h-10 border-2 border-end-yellow text-end-yellow flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Coffee size={24} strokeWidth={2.5} />
        </div>
          <span className="font-mono text-sm tracking-widest hidden md:inline opacity-80">卢布朗咖啡店 // 个人博客</span>
        </div>

        <div className={`hidden md:flex gap-1 opacity-50 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
             {[...Array(5)].map((_,i) => <div key={i} className={`h-1 w-8 ${i===2 ? 'bg-end-yellow' : 'bg-current'}`}></div>)}
        </div>

        <div className="flex items-center gap-6 font-mono text-xs">
          <span className="hidden md:inline opacity-70">{time.toLocaleTimeString()} UTC+8</span>
          
          <button onClick={() => setLang(lang === 'CN' ? 'EN' : 'CN')} className="hover:text-end-yellow transition-colors">
            <Globe size={18} />
          </button>

          {/* 播放器组件 */}
          <div className={`flex items-center gap-4 border-l border-r px-4 mx-2 h-8 ${theme === 'light' ? 'border-gray-300' : 'border-gray-600/50'}`}>
            <div className="flex items-center gap-2">
              <button onClick={playPrev} className="hover:text-end-yellow transition-colors opacity-50 hover:opacity-100"><SkipBack size={14} /></button>
              <button onClick={() => {
                  if (audioPlaying) audioRef.current.pause();
                  else audioRef.current.play();
                  setAudioPlaying(!audioPlaying);
              }} className="hover:text-end-yellow transition-colors">
                  {audioPlaying ? <div className="w-2 h-2 bg-end-yellow animate-pulse shadow-[0_0_8px_#FFC107]"></div> : <div className="w-2 h-2 bg-gray-500"></div>}
              </button>
              <button onClick={playNext} className="hover:text-end-yellow transition-colors opacity-50 hover:opacity-100"><SkipForward size={14} /></button>
            </div>

            <div className="w-24 overflow-hidden hidden lg:block">
               <div className="text-[10px] font-mono text-end-yellow whitespace-nowrap">
                 {audioPlaying ? `>> PLAYING: ${playlist[currentSongIndex].title}` : ">> PAUSED"}
               </div>
            </div>

            <div className="flex items-center gap-2 group">
              <div className="text-gray-400 group-hover:text-end-yellow transition-colors">
                {volume === 0 ? <VolumeX size={14}/> : <Volume2 size={14}/>}
              </div>
              <input 
                type="range" min="0" max="1" step="0.05" value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 bg-gray-700 rounded-none appearance-none cursor-pointer accent-end-yellow"
              />
            </div>
          </div>

          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:text-end-yellow transition-colors">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* 主体布局 */}
      <main className="flex-1 flex overflow-hidden z-10">
        
        {/* 左侧导航栏 */}
        <nav className={`w-20 md:w-64 border-r flex flex-col justify-between py-8 backdrop-blur-md transition-colors duration-500
              ${theme === 'light' ? 'bg-white/60 border-gray-300' : 'bg-black/40 border-gray-700/50'}`}>
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center gap-4 px-6 py-4 font-mono text-sm transition-all relative
                  ${activeTab === item.id 
                    ? 'text-end-yellow bg-end-yellow/10 border-r-4 border-end-yellow' 
                    : (theme === 'light' ? 'text-gray-500 hover:text-black hover:bg-black/5' : 'text-gray-400 hover:text-white hover:bg-white/5')
                  }
                `}
              >
                {item.icon}
                <span className="hidden md:block tracking-wider group-hover:translate-x-1 transition-transform">{item.label}</span>
                {activeTab === item.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-end-yellow shadow-[0_0_10px_#FFC107]"></div>}
              </button>
            ))}
          </div>

          <div className="px-6 hidden md:block">
             <div className="text-[10px] text-gray-500 font-mono space-y-1">
               <div className="flex justify-between"><span>SYS_VER</span> <span>11.45.14</span></div>
               <div className="flex justify-between"><span>NET_STAT</span> <span className="text-green-500">STABLE</span></div>
             </div>
          </div>
        </nav>

        {/* 内容显示区域 - 增加了构筑主义边框 (Corner Brackets) */}
        <section className={`flex-1 p-6 md:p-12 relative overflow-hidden flex flex-col backdrop-blur-sm transition-colors duration-500
          ${theme === 'light' ? 'bg-white/40' : 'bg-white/5'}`}>
          
          {/* --- 角标装饰 (构筑主义风格) --- */}
          <div className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 transition-colors duration-300 ${theme === 'light' ? 'border-gray-800' : 'border-end-yellow'}`}></div>
          <div className={`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 transition-colors duration-300 ${theme === 'light' ? 'border-gray-800' : 'border-end-yellow'}`}></div>
          <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 transition-colors duration-300 ${theme === 'light' ? 'border-gray-800' : 'border-end-yellow'}`}></div>
          <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 transition-colors duration-300 ${theme === 'light' ? 'border-gray-800' : 'border-end-yellow'}`}></div>
          
          {/* 顶部中央装饰 */}
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center gap-2 pt-2 opacity-50 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              <div className="w-12 h-[2px] bg-current"></div>
              <div className="text-[10px] font-mono tracking-widest">DISPLAY_AREA</div>
              <div className="w-12 h-[2px] bg-current"></div>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }}
              className="h-full w-full pt-4"
            >
              {activeTab === 'home' && <Dashboard lang={lang} theme={theme} />}
              {activeTab === 'projects' && <Projects />}
              
              {activeTab === 'notes' && <Notes theme={theme} />}


               {activeTab === 'guestbook' && (
                <div className="flex flex-col gap-6 max-w-lg mt-10 ml-4">
                  <h3 className="font-mono text-end-yellow text-xl">> TRANSMIT_MESSAGE</h3>
                  <textarea className={`bg-transparent border p-4 font-mono text-sm focus:border-end-yellow focus:outline-none transition-colors h-40 w-full resize-none 
                    ${theme === 'light' ? 'border-gray-400 text-black placeholder-gray-500' : 'border-gray-600 text-white'}`} placeholder="Input data packet..."></textarea>
                  <button className="bg-end-yellow text-black font-bold py-3 px-8 font-mono hover:bg-white transition-colors self-start skew-x-[-10deg] active:scale-95 shadow-lg">
                    <span className="skew-x-[10deg] inline-block">SEND_SIGNAL</span>
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      <audio ref={audioRef} src={playlist[currentSongIndex].src} onEnded={playNext} />
    </div>
  );
}
