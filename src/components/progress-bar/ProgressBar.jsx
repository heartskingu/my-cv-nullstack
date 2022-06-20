import Nullstack from 'nullstack';
import './progress-bar.css';

class ProgressBar extends Nullstack {

  render({level}) {
    return (
      <div class={`progress-bar progress-bar-fill-${level}`}></div>
    )
  }

}

export default ProgressBar;