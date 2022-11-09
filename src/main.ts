import './style.css';

const trailer = document.getElementById('trailer') as HTMLDivElement;

const animateTrailer = (event: MouseEvent, interacting: boolean) => {
  const x = event.clientX - trailer.offsetWidth / 2;
  const y = event.clientY - trailer.offsetHeight / 2;

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 6 : 1})`
  }

  trailer.animate(
    keyframes, {
    duration: 800,
    fill: 'forwards'
  }
  )
}

function getTrailerClass(type: string): string {
  switch (type) {
    case "video":
      return "fa-solid fa-play"
    default:
      return "fa-solid fa-arrow-up-right"
  }
}

window.onmousemove = (event: MouseEvent) => {
  const target = event.target as HTMLBodyElement;
  const interactable = target.closest('.interactable');
  const interacting = interactable !== null;

  const icon = document.getElementById('trailer-icon') as HTMLElement;

  animateTrailer(event, interacting);

  trailer.dataset.type = interacting ? (interactable as HTMLElement).dataset.type : "";

  if (interactable instanceof HTMLElement) {
    if (interacting && icon !== null) {
      icon.className = getTrailerClass(interactable.dataset.type ? interactable.dataset.type : "");
    }
  }
}
