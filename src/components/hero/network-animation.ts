export class NetworkAnimation {
  private nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
  private ctx!: CanvasRenderingContext2D;
  private width!: number;
  private height!: number;
  private animationFrame!: number;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Could not get 2D context');
      return;
    }
    this.ctx = context;
    
    console.log('Canvas dimensions:', this.width, this.height); // Debug log
    this.resize(canvas);
    this.init();
    
    // Log number of nodes created
    console.log('Number of nodes:', this.nodes.length);
    
    this.animate();
  }

  resize(canvas: HTMLCanvasElement) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    this.width = rect.width * dpr;
    this.height = rect.height * dpr;
    
    canvas.width = this.width;
    canvas.height = this.height;
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    this.ctx.scale(dpr, dpr);
  }

  private init() {
    const nodeCount = Math.max(50, Math.floor((this.width * this.height) / 25000)); // Ensure minimum nodes
    console.log('Creating nodes:', nodeCount); // Debug log
    
    this.nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 1, // Increased speed
        vy: (Math.random() - 0.5) * 1, // Increased speed
      });
    }
  }

  private drawConnections() {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
          this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update node positions
    this.nodes.forEach(node => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > this.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.height) node.vy *= -1;
    });

    this.drawConnections();

    // Draw nodes with increased opacity
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.nodes.forEach(node => {
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  destroy() {
    cancelAnimationFrame(this.animationFrame);
  }
} 