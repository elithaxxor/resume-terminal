// Function to simulate slow typing effect
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
  
  // Function to log visitor data to the backend
  async function logVisitorData(): Promise<void> {
    try {
      const response = await fetch('http://localhost:3000/log', {
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
  
    // Log visitor data on page load
    await logVisitorData();
  
    terminalInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        handleCommand(command);
        terminalInput.value = '';
      }
    });
  }
  
  // Handle user commands
  function handleCommand(command: string): void {
    const output = document.getElementById('output')!;
    output.innerHTML += `>$ ${command}\n`;
  
    switch (command) {
      case 'help':
        output.innerHTML += 'Available commands: summary, contact, skills, certifications, experience, education\n';
        break;
      case 'summary':
        showSection('summary');
        output.innerHTML += 'Displaying summary section.\n';
        break;
      case 'contact':
        showSection('contact');
        output.innerHTML += 'Displaying contact information.\n';
        break;
      case 'skills':
        showSection('skills');
        output.innerHTML += 'Displaying skills section.\n';
        break;
      case 'certifications':
        showSection('certifications');
        output.innerHTML += 'Displaying certifications section.\n';
        break;
      case 'experience':
        showSection('experience');
        output.innerHTML += 'Displaying experience section.\n';
        break;
      case 'education':
        showSection('education');
        output.innerHTML += 'Displaying education section.\n';
        break;
      default:
        output.innerHTML += 'Command not found. Type "help" for available commands.\n';
    }
    output.scrollTop = output.scrollHeight;
  }
  
  // Show a specific resume section
  function showSection(section: string): void {
    document.querySelectorAll('.resume-section').forEach(el => el.classList.add('hidden'));
    const sectionEl = document.getElementById(section);
    if (sectionEl) sectionEl.classList.remove('hidden');
  }
  
  document.addEventListener('DOMContentLoaded', init);