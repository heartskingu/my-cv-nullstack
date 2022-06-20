import Nullstack from 'nullstack';
import './comic-box.css';

class ComicBox extends Nullstack {

  render({children, bgColor, patternColor, className}) {
    return (
      <div class={`comic-box comic-box-${bgColor} comic-box-pattern-${patternColor} ${className}`}>{children}</div>
    )
  }

}

export default ComicBox;