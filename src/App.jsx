import Navbar from "@/components/NavBar/NavBar"
import ProductSelection from "@/pages/ProductSelection/ProductSelection"

import './styles/timer.css'

import { useState, useEffect, useRef } from 'react'


// todo : working one
// const CountdownTimer = ({ startTimeInSeconds, size }) => {
//   const [timeRemainingInSeconds, setTimeRemainingInSeconds] = useState(startTimeInSeconds);

//   useEffect(() => {
//     const decrementTimeRemaining = () => {
//       setTimeRemainingInSeconds(prevTime => {
//         if (prevTime > 0) {
//           return prevTime - 1;
//         } else {
//           clearInterval(timer);
//           return prevTime;
//         }
//       });
//     };

//     const timer = setInterval(decrementTimeRemaining, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, [startTimeInSeconds]);

//   const radius = size / 2 - 2;  // Calculate radius for circle, with some padding
//   const circumference = 2 * Math.PI * radius;

//   return (
//     <div className="countdown-timer" style={{ width: size, height: size }}>
//       <div className="countdown-timer__circle" style={{ width: size, height: size }}>
//         <svg width={size} height={size}>
//           <circle
//             r={radius}
//             cx={size / 2}
//             cy={size / 2}
//             style={{
//               animation: `countdown-animation ${startTimeInSeconds}s linear`,
//               strokeDasharray: circumference,
//               strokeDashoffset: 0
//             }}
//           />
//         </svg>
//       </div>
//       <div className="countdown-timer__text" style={{ top: size / 3.2, fontSize: size / 3.7 }}>
//         {timeRemainingInSeconds}s
//       </div>
//       <style>
//         {`
//           @keyframes countdown-animation {
//             from {
//               stroke-dashoffset: 0;
//             }
//             to {
//               stroke-dashoffset: ${circumference};
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };


// export default CountdownTimer;
const CountdownTimer = ({ startTimeInSeconds, size }) => {
  const [timeRemainingInSeconds, setTimeRemainingInSeconds] = useState(startTimeInSeconds);
  const circleRef = useRef(null);
  const styleRef = useRef(null);

  useEffect(() => {
    const decrementTimeRemaining = () => {
      setTimeRemainingInSeconds(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    };

    const timer = setInterval(decrementTimeRemaining, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startTimeInSeconds]);

  useEffect(() => {
    const radius = size / 2 - 2;  // Calculate radius for circle, with some padding
    const circumference = 2 * Math.PI * radius;

    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = circumference;
      circleRef.current.style.strokeDashoffset = circumference;
    }

    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes countdown-animation {
        from {
          stroke-dashoffset: 0;
        }
        to {
          stroke-dashoffset: ${circumference};
        }
      }
    `;
    if (styleRef.current) {
      styleRef.current.appendChild(styleElement);
    }
  }, [size]);

  const radius = size / 2 - 2;
  // const circumference = 2 * Math.PI * radius;

  return (
    <div className="countdown-timer" style={{ width: size, height: size }}>
      <div className="countdown-timer__circle" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <circle
            ref={circleRef}
            r={radius}
            cx={size / 2}
            cy={size / 2}
            style={{
              animation: `countdown-animation ${startTimeInSeconds}s linear`,
            }}
          />
        </svg>
      </div>
      <div className="countdown-timer__text" style={{ top: size / 3.2, fontSize: size / 3.7 }}>
        {timeRemainingInSeconds}s
      </div>
      <div ref={styleRef}></div>
    </div>
  );
};


function App() {

  // const handleClick = (e) => {
  //   console.log('handleClick', e.clientX, e.clientY)
  // }

  // useEffect(() => {
  //   window.addEventListener('click', handleClick)

  //   return () => window.removeEventListener('click', handleClick)

  // }, [])

  return (
    <>
      hello
      <CountdownTimer startTimeInSeconds={20} size={150} />
    </>
  )
}

export default App





// import Navbar from "@/components/NavBar/NavBar"
// import ProductSelection from "@/pages/ProductSelection/ProductSelection"



// import { useState, useEffect } from 'react'


// const DATA = [{ id: '1', children: null, title: 'option1' }, { id: '2', title: 'option2', children: [{ id: '3', children: null, title: 'option2a' }, { id: '4', children: null, title: 'option2b' }] }]

// const Box = ({ children = [], title = '' }) => {
//   const [open, setOpen] = useState(false)

//   const toggle =  () => setOpen(prevState => !prevState)
//   return <div>
//     <div onClick={toggle}>{title}</div>
//     {open && <div>{children}</div>}
//   </div>
// }

// const Title = ({ title = '' }) => {
//   return <div style={{ height: '24px', width: '100px', border: '1px solid red' }}>{title}</div>
// }

// const compMap = (comp) => {
//   const { children, id, title } = comp

//   if (children) {
//     return <Box title={title} key={id}>
//       {children.map((child) => compMap(child))}
//     </Box>
//   } else {
//     return <Title title={title} key={id} />
//   }

// }

// function App() {

//   const handleClick = (e) => {
//     console.log('handleClick', e.clientX, e.clientY)
//   }

//   useEffect(() => {
//     window.addEventListener('click', handleClick)

//     return () => window.removeEventListener('click', handleClick)

//   }, [])

//   return (
//     <>
//       hello
//       {DATA.map((item) => compMap(item))}
//     </>
//   )
// }

// export default App
