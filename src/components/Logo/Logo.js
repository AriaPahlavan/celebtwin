import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'

const Logo = () => {
  const logoSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATbSURBVHhe7Zzbb1RVFIf7n3l7kMQYFTRR9EWNmsaq2BBfjBeExDvVCEYbAe2FKoVq1MQHfIBWaDultThtaKVA6UxRLgMVS6dQOtvzO/PbDZJZZdq1ZzrtrC/ZyWRmnT1rf7PPZZ/MWTWGYRjG4rQenax7p2M0+fSXA7MPfdybu/+9bldMe6P9hFtpkEOh3Aq1aGwOY9zSMZJs7Zqo4/CXz57O8fvqW5KZQl9WTFttAm9vm5qTGTigjqWx8+DplzY0JOLZ9uTOfncgcc6NX5xxM9dvMrW1R/bGfDxGjPWpz/tjiesjB3BBLcXx1aHUPV5etOvGHVcbGPO270fzErcncrsPj99LPXdmc8twvNtuieTl2GE1grFvpcToUHaJehanrTtdiw027uivypl3O3CwMTqEwUlT59laapLZ2jH6B4Lbe8+xC2N/5AJO4IaaZJ5p/H0WwWcuXOPmBlzACdxQkwzOOgj+NzvHzQ1cecAJroGpSQaBaMb/8V6oScYEFsYEKjGBSkygEhOoxAQqMYFKTKASE6ikaIG4g1sJd5IrDe+FmmQYbwhQkwzjDAFqkmGcmlCHAm0/ofLwUJMM49SEOhlp+wmVh4eaZBinJlTi2n5C5eGhJhnGqQmVuLafUHl4qEmGcWpCJa7tJ1QeHmqSYZyaUIlr+wmVh4eaZBinJlTi2n5C5eGhJhnGqQmVuLafUHl4qEmGcWpCJa7tJ1QeHmqSYZyaUBewWgGr9kI6FKFnkBZqkmFcxWAClZhAJSZQiQlUYgKVmEAF12bzfyt7pCHBd1YeapJhXEWwr2cyFvjW/hG+s/JQkwzjVpTpaOZB3gMf9rh173e74fRVfrLyUJMM48oOllv+eOcb5LUdTTOiMqAmGcaVnVsFro+OeW8fGKmomeehJhnGGQLUJMM4Q4CaZBhnCFCTDOMMAWqSYZwhQE0yjDMEqEmGccHBZUp9y5A7/88s3wnHX1OzblPzUNBb9xLUJMO44LzSlIyv8TY09LmfB/52uQDP0d6cz8UPRz+8PRH3vbl1mJ+UDmqSwa9Yil8Sy7MPfjq5cLH88jdJ1zWScdfnlv5ILR5BPZi84F7YdTzua13UGn45VdKn6b0XapLxAywVA2emFgaOhtmDB7u/7Z50faeuuHQm6y5P34jFouF1KjPjesYuu73Rsg6DePCj3oXt8UOUY8Xiv4+aZHxgKcHee+z0VLxcu1VGsQ3VNd798aQbSpVvqee/m5pkfGC5wG53ZDTjdh86617fdwLP5LrHPzsWi0XD62cbB92b7SPu68MTrnfsyrJ2ey0VK3C1YAKVmEAlJlCJCVRiApWYQCVFC/Tl7dZykbGlcjU7F8tDPTFqkkH9PASjipmRZ+z8dCzwucbBLDXJoPgggnGXw8jzXbROh5NtP/w5SE0y0XKpDsGon2fFx/J/L8FyEk7aelLPU9Pi1Dfnq1aifl41l7+bz+Xiv5XAxWt7hy9Sz51BsUEUHcSGqJ9XjTMRMw93i+DgsU/7cnu6UndTT3Gg7KUvRIb6eSgBhypma/nsjLFhjO09k+6JHfnd9tFPErkvfh1/kVqWBmbiqy3JS+hoOa0Ud7aXCnIolFsxDbvtrs6Ju6hj+TT9lq5F8UHUz1vjZZBzGGN02DreeqTIE4ZhGEbVUlPzH00lmM1YoB/KAAAAAElFTkSuQmCC";

  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2"
            options={{ max : 25 }}
            style={{ height: 100, width: 100 }} >
       <div className="Tilt-inner pa3">
         <img src={logoSrc}
              alt='logo'/>
       </div>
      </Tilt>
    </div>
  );
};

export default Logo;
