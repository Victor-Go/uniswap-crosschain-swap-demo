export const particlesOptions: any = {
  fullScreen: {
    enable: false,
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: '#00FFA2',
    },
    groups: {},
    move: {
      angle: {
        offset: 0,
        value: 90,
      },
      attract: {
        distance: 200,
        enable: false,
        rotate: {
          x: 3000,
          y: 3000,
        },
      },
      center: {
        x: 50,
        y: 50,
        mode: 'percent',
      },
      enable: true,
      outModes: {
        default: 'out',
        bottom: 'out',
        left: 'out',
        right: 'out',
        top: 'out',
      },
      random: true,
      speed: 0.5,
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      limit: 0,
      value: 150,
    },
    opacity: {
      random: {
        enable: true,
        minimumValue: 0.3,
      },
      value: {
        min: 0.3,
        max: 0.8,
      },
    },
    reduceDuplicates: true,
    shape: {
      close: true,
      fill: true,
      options: {},
      type: 'circle',
    },
    size: {
      random: {
        enable: true,
        minimumValue: 1,
      },
      value: {
        min: 1,
        max: 5,
      },
    },
    stroke: {
      width: 1.5,
    },
    links: {
      blink: false,
      color: {
        value: '#00C8FF',
      },
      consent: false,
      distance: 200,
      enable: true,
      frequency: 0.6,
      opacity: 1,
      triangles: {
        enable: true,
        frequency: 0.05,
        color: {
          value: '#71FFDC',
        },
        opacity: 0.1,
      },
      width: 1,
      warp: false,
    },
  },
}
