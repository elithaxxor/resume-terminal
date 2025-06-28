// // Function to simul/* `'sqlite3'` is a Node.js module that provides an interface for interacting with
// SQLite databases. In the code snippet provided, it is being imported to use its
// functionality for creating and managing a SQLite database. */
// ate slow typing effect


//The function uses a promise to resolve when the entire text has been typed. It does this by recursively calling the type function, which appends one character at a time to the element's innerHTML, until the entire text has been typed.
async function typeText(element: HTMLElement, text: string, delay: number = 50): Promise<void> {
    return new Promise((resolve) => {
      let index = 0;
      function type() {
        if (index < text.length) {
          element.innerHTML += text.charAt(index);
          index++;
          setTimeout(type, delay);
        } else {
          resolve();
        }
      }
      type();
    });
}

const commandHistory: string[] = [];
let historyIndex = 0;
const commands = ['help','summary','contact','skills','certifications','experience','education','download','theme','lang en','lang es','share linkedin','share email'];

type Lang = 'en' | 'es';
let currentLang: Lang = (localStorage.getItem('lang') as Lang) || 'en';

const translations: Record<Lang, Record<string,string>> = {
  en: {
    welcome: "Welcome to Adel Alaali's Resume Terminal\n",
    init: "Initializing system...\n",
    access: "Access granted.\n",
    helpPrompt: 'Type "help" for available commands.\n',
    help: 'Available commands: summary, contact, skills, certifications, experience, education, download, theme, lang\n',
    notFound: 'Command not found. Type "help" for available commands.\n',
    downloading: 'Downloading resume...\n',
    toggled: 'Toggled theme.\n',
    summary: 'Displaying summary section.\n',
    contact: 'Displaying contact information.\n',
    skills: 'Displaying skills section.\n',
    certs: 'Displaying certifications section.\n',
    experience: 'Displaying experience section.\n',
    education: 'Displaying education section.\n'
  },
  es: {
    welcome: "Bienvenido al Terminal de Curr\u00edculum de Adel Alaali\n",
    init: "Inicializando sistema...\n",
    access: "Acceso concedido.\n",
    helpPrompt: 'Escriba "help" para ver los comandos disponibles.\n',
    help: 'Comandos disponibles: summary, contact, skills, certifications, experience, education, download, theme, lang\n',
    notFound: 'Comando no encontrado. Escriba "help" para ver los comandos disponibles.\n',
    downloading: 'Descargando curr\u00edculum...\n',
    toggled: 'Tema cambiado.\n',
    summary: 'Mostrando la secci\u00f3n de resumen.\n',
    contact: 'Mostrando informaci\u00f3n de contacto.\n',
    skills: 'Mostrando habilidades.\n',
    certs: 'Mostrando certificaciones.\n',
    experience: 'Mostrando experiencia.\n',
    education: 'Mostrando educaci\u00f3n.\n'
  }
};

function t(key: string): string {
  return translations[currentLang][key] || key;
}

function applyTheme(theme: 'dark' | 'light'): void {
  const body = document.body;
  body.classList.remove('light-theme', 'dark-theme');
  body.classList.add(`${theme}-theme`);
  localStorage.setItem('theme', theme);
}

function toggleTheme(): void {
  const current = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

  // Function to log visitor data to the backend
  async function logVisitorData(): Promise<void> {
    try {
      const response = await fetch('http://localhost:9991/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error('Error logging visitor data:', error);
    }
  }
  
  // Initialize the terminal
async function init(): Promise<void> {
  const output = document.getElementById('output')!;
  await typeText(output, t('welcome'));
  await typeText(output, t('init'));
  await new Promise(resolve => setTimeout(resolve, 1000));
  await typeText(output, t('access'));
  await typeText(output, t('helpPrompt'));
  
  const inputLine = document.getElementById('input-line')!;
  inputLine.style.display = 'flex';
  const terminalInput = document.getElementById('terminal-input') as HTMLInputElement;
  terminalInput.focus();
  const list = document.getElementById('commands') as HTMLDataListElement;
  list.innerHTML = commands.map(c=>`<option value="${c}"></option>`).join('');

  const saved = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  applyTheme(saved);
  document.getElementById('theme-toggle')!.addEventListener('click', toggleTheme);
  document.getElementById('lang-toggle')!.addEventListener('click', () => {
    const newLang: Lang = currentLang === 'en' ? 'es' : 'en';
    currentLang = newLang;
    localStorage.setItem('lang', newLang);
  });

  // Log visitor data on page load
  await logVisitorData();

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (historyIndex > 0) historyIndex--;
      terminalInput.value = commandHistory[historyIndex] || '';
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) historyIndex++;
      else historyIndex = commandHistory.length;
      terminalInput.value = commandHistory[historyIndex] || '';
      e.preventDefault();
    } else if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      if (command) {
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        handleCommand(command);
      }
      terminalInput.value = '';
    } else if (e.key === 'Tab') {
      const prefix = terminalInput.value.toLowerCase();
      const match = commands.find(c => c.startsWith(prefix));
      if (match) {
        terminalInput.value = match;
        e.preventDefault();
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!e.altKey) return;
    const map: Record<string,string> = {h:'help',s:'summary',d:'download',t:'theme'};
    const cmd = map[e.key.toLowerCase()];
    if (cmd) {
      handleCommand(cmd);
      e.preventDefault();
    }
  });
}


  /**
   * Handles user commands by displaying the corresponding section of the resume.
   * @param {string} command The user's command.
   */
  // Handle user commands
  function handleCommand(command: string): void {
    const output = document.getElementById('output')!;
    output.innerHTML += `>$ ${command}\n`;
  
    switch (command) {
      case 'help':
        // Display available commands
        output.innerHTML += t('help');
        break;
      case 'summary':
        // Display the summary section
        showSection('summary');
        output.innerHTML += t('summary');
        break;
      case 'contact':
        // Display contact information
        showSection('contact');
        output.innerHTML += t('contact');
        break;
      case 'skills':
        // Display the skills section
        showSection('skills');
        output.innerHTML += t('skills');
        break;
      case 'certifications':
        // Display the certifications section
        showSection('certifications');
        output.innerHTML += t('certs');
        break;
      case 'experience':
        // Display the experience section
        showSection('experience');
        output.innerHTML += t('experience');
        break;
      case 'education':
        // Display the education section
        showSection('education');
        output.innerHTML += t('education');
        break;
      case 'download':
      case 'download resume':
        window.open('resume.pdf', '_blank');
        output.innerHTML += t('downloading');
        break;
      case 'theme':
        toggleTheme();
        output.innerHTML += t('toggled');
        break;
      case 'share linkedin':
        window.open('https://www.linkedin.com/shareArticle?mini=true&url='+encodeURIComponent(location.href), '_blank');
        output.innerHTML += 'Opening LinkedIn share window...\n';
        break;
      case 'share email':
        window.location.href = 'mailto:?subject=Check%20out%20this%20resume&body='+encodeURIComponent(location.href);
        output.innerHTML += 'Opening email client...\n';
        break;
      case 'lang en':
        currentLang = 'en';
        localStorage.setItem('lang', 'en');
        output.innerHTML += 'Language set to English.\n';
        break;
      case 'lang es':
        currentLang = 'es';
        localStorage.setItem('lang', 'es');
        output.innerHTML += 'Idioma cambiado a Espa\u00f1ol.\n';
        break;
      default:
        // Command not found
        output.innerHTML += t('notFound');
    }
    output.scrollTop = output.scrollHeight;
  }
/******  2ed6f8fe-a8f9-4e5a-ab63-13f9683ae51e  *******/
  
  // Show a specific resume section
  function showSection(section: string): void {
    document.querySelectorAll('.resume-section').forEach(el => el.classList.add('hidden'));
    const sectionEl = document.getElementById(section);
    if (sectionEl) sectionEl.classList.remove('hidden');
  }
  
  document.addEventListener('DOMContentLoaded', init);

  const chatInput = document.getElementById('chat-input') as HTMLInputElement;
  const chatLog = document.getElementById('chat-log')!;
  if (chatInput) {
    chatInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' && chatInput.value) {
        const q = chatInput.value;
        chatInput.value = '';
        chatLog.innerHTML += `<div class="me">${q}</div>`;
        const resp = await fetch('http://localhost:9991/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: q })
        });
        const data = await resp.json();
        chatLog.innerHTML += `<div class="bot">${data.reply}</div>`;
        chatLog.scrollTop = chatLog.scrollHeight;
      }
    });
  }
