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
  await typeText(output, "Welcome to Adel Alaali's Resume Terminal\n");
    await typeText(output, "Initializing system...\n");
    await new Promise(resolve => setTimeout(resolve, 1000));
    await typeText(output, "Access granted.\n");
    await typeText(output, 'Type "help" for available commands.\n');
  
  const inputLine = document.getElementById('input-line')!;
  inputLine.style.display = 'flex';
  const terminalInput = document.getElementById('terminal-input') as HTMLInputElement;
  terminalInput.focus();

  const saved = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
  applyTheme(saved);
  document.getElementById('theme-toggle')!.addEventListener('click', toggleTheme);

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
        output.innerHTML += 'Available commands: summary, contact, skills, certifications, experience, education, download, theme\n';
        break;
      case 'summary':
        // Display the summary section
        showSection('summary');
        output.innerHTML += 'Displaying summary section.\n';
        break;
      case 'contact':
        // Display contact information
        showSection('contact');
        output.innerHTML += 'Displaying contact information.\n';
        break;
      case 'skills':
        // Display the skills section
        showSection('skills');
        output.innerHTML += 'Displaying skills section.\n';
        break;
      case 'certifications':
        // Display the certifications section
        showSection('certifications');
        output.innerHTML += 'Displaying certifications section.\n';
        break;
      case 'experience':
        // Display the experience section
        showSection('experience');
        output.innerHTML += 'Displaying experience section.\n';
        break;
      case 'education':
        // Display the education section
        showSection('education');
        output.innerHTML += 'Displaying education section.\n';
        break;
      case 'download':
      case 'download resume':
        window.open('resume.pdf', '_blank');
        output.innerHTML += 'Downloading resume...\n';
        break;
      case 'theme':
        toggleTheme();
        output.innerHTML += 'Toggled theme.\n';
        break;
      default:
        // Command not found
        output.innerHTML += 'Command not found. Type "help" for available commands.\n';
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
