import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  code: string;
}

export default function Mermaid({ code }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    
    const renderDiagram = async () => {
      try {
        // Read current computed theme variables from the document
        const style = getComputedStyle(document.documentElement);
        const getVar = (name: string) => `rgb(${style.getPropertyValue(name).trim()})`;
        
        // Initialize Mermaid with dynamic CSS variables
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            fontFamily: 'JetBrains Mono, monospace',
            background: 'transparent',
            textColor: getVar('--color-text-base'),
            mainBkg: getVar('--color-card-muted'),
            primaryColor: getVar('--color-card-muted'),
            secondaryColor: getVar('--color-card'),
            tertiaryColor: getVar('--color-fill'),
            primaryTextColor: getVar('--color-text-base'),
            secondaryTextColor: getVar('--color-text-base'),
            tertiaryTextColor: getVar('--color-text-base'),
            primaryBorderColor: getVar('--color-border'),
            secondaryBorderColor: getVar('--color-border'),
            tertiaryBorderColor: getVar('--color-border'),
            lineColor: getVar('--color-accent'),
            actorTextColor: getVar('--color-text-base'),
            actorBkg: getVar('--color-card-muted'),
            actorBorder: getVar('--color-border'),
            signalColor: getVar('--color-accent'),
            signalTextColor: getVar('--color-text-base'),
            messageTextColor: getVar('--color-text-base'),
            noteBkgColor: getVar('--color-card-muted'),
            noteBorderColor: getVar('--color-border'),
            noteTextColor: getVar('--color-text-base'),
          }
        });

        // Generate a unique ID for this render to avoid cache bleeding
        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;
        const { svg: renderedSvg } = await mermaid.render(id, code);
        
        if (isMounted) {
          setSvg(renderedSvg);
          setError('');
        }
      } catch (err: unknown) {
        if (isMounted) {
          console.error("Mermaid Render Error:", err);
          const errorMessage = err instanceof Error ? err.message : 'Failed to render Mermaid diagram';
          setError(errorMessage);
        }
      }
    };

    renderDiagram();

    // Re-render automatically when the theme flips
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          setTimeout(renderDiagram, 10);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      isMounted = false;
      observer.disconnect();
    };
  }, [code]);

  if (error) {
    return (
      <div className="w-full my-8 p-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 font-mono text-sm overflow-x-auto">
        <p className="font-bold mb-2">Mermaid Syntax Error:</p>
        <pre>{error}</pre>
      </div>
    );
  }

  // Uses the global .mermaid CSS class for consistent styling
  return (
    <div 
      ref={containerRef}
      className="mermaid"
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
}
