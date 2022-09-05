export function formatDate(date) {
    function pad2(num) {
        return num.toString().padStart(2, "0");
    }

    if (date) {
        return (
            [
                pad2(date.getDate()),
                pad2(date.getMonth() + 1),
                date.getFullYear()
            ].join("/") + " " +
            [
                pad2(date.getHours()),
                pad2(date.getMinutes()),
                pad2(date.getSeconds())
            ].join(":")
        )
    } else {
        return undefined
    }
}

export const formatSpecial = (date) => {
    const fPad2 = (num) => {
        return num.toString().padStart(2, "0");
    };

    if (date) {
        return (
            [fPad2(date.getDate()), date.toLocaleString("es-PE", { month: "short" })].join(" ")  +
            " " +
            [fPad2(date.getHours()), fPad2(date.getMinutes())].join(":")
        );
    } else {
        return undefined;
    }
};

export function clickOutside(node) {
  
    const handleClick = event => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent('click_outside', node)
        )
      }
    }
  
      document.addEventListener('click', handleClick, true);
    
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
      }
  }