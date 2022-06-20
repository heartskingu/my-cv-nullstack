import Nullstack from 'nullstack';
import './comic-container.css';

class ComicContainer extends Nullstack {

  render({children, className}) {
    return (
      <div class={`comic-container ${className}`}>{children}</div>
    )
  }

}

export default ComicContainer;