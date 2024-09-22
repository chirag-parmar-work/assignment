import { useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const ScriptSnippet = () => {
    const SurfaceId = "SURFACE-123123";
    
 
    const [copied, setCopied] = useState(false);
    const script = `<script>
      (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          'surface.start': new Date().getTime(),
          event: 'surface.js'
        });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'surface' ? '&l=' + l : '';
        j.async = true;
         j.src = 'https://chirag-parmar-work.github.io/test/tag.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'surface', '${SurfaceId}');
    </script>`;
  
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(script);
      
        setCopied(true);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };
  
    return (
      <div className="relative px-6">
        <div className="overflow-x-auto rounded-xl bg-[#F9F9F9] p-4 text-sm border-2 border-[#E2E4E9] shadow-[0px_2px_4px_0px_#1B1C1D0A]">
          <SyntaxHighlighter language="javascript" style={{ ...vs, hljs: { ...vs.hljs, background: '#F9F9F9' } }}>
            {script}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={copyToClipboard}
          
          className="absolute right-[45px] top-[6px] mt-4 rounded-lg bg-blue-600 px-4 py-1.5 text-white"
        >
         { copied ? "Copied" : "Copy Snippet" }
         
        </button>
   
  
      </div>
    );
  };
  