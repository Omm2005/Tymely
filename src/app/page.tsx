import LoginButton from "@/components/global/LoginButton";
import Navbar from "@/components/global/Navbar";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import ShimmerButton from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BorderBeam } from "@/components/ui/shimmer-border-beam";
import BoxReveal from "@/components/ui/box-reveal";
import NumberTicker from "@/components/ui/number-ticker";
import { BentoGridSecondDemo } from "@/components/Bento";
import TymelyLogo from "@/../public/Tymelylogo.png"
import { Button } from "@/components/ui/button";
import WordPullUp from "@/components/ui/words-pullup";
import RadialGradient from "@/components/global/radical-gradient";
import ThemeImage from "@/components/global/theme-image-changer";
import TymelyPreview from "@/../public/TymelyPreview.jpeg"
import TymelyPreviewLight from '@/../public/TymelyPreviewLight.jpeg'

export default async function Home() {
  const session = await getServerAuthSession()
  const user = session?.user
  return (
    <main className="flex items-center justify-center overflow-hidden flex-col gap-10 md:mx-28">
    <Navbar user={user} />
    <section className="h-auto w-full md:py-10 py-3 flex flex-col justify-center items-center md:gap-7 gap-3 mx-10">
      <RadialGradient className="-z-10" size={500} />
    <ShimmerButton className="shadow-2xl h-10 bg-background">
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-foreground from-foreground to-muted-foreground lg:text-lg">
          Star on Github
        </span>
      </ShimmerButton>
      <h2 className="text-center md:text-5xl text-2xl font-light md:w-4/5">
        Spend time to things that 
        <WordPullUp
        className="inline-block text-center md:text-5xl text-2xl font-light ml-3"
        words="matter"
        />.
         Create your plan with us and just <WordPullUp
        className="inline-block text-center md:text-5xl text-2xl font-light ml-3"
        words="start building"
        /><span className="text-[#5046e6]">.</span>
      </h2>
      {
            user ? 
            (
              <Link
              href="/workflows"
              className="flex overflow-hidden rounded-full"
              >
            <AnimatedGradientText className="m-2">
            <span
          className={cn(
            ` animate-gradient flex md:text-xl text-xm bg-gradient-to-r from-[#ffaa40] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent bg-background`,
          )}
          >
                  🎉 <hr className="mx-2 h-6 justify-center items-center flex w-[1px] shrink-0 bg-muted-foreground" />{" "} Just Start Building
            </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
          </Link>
          ) : <LoginButton cta /> 
        }

      {/* </BoxReveal> */}
      {/* Button */}
      <div className="w-full h-auto md:py-10 py-4 md:px-3 px-2 md:gap-8 gap-5 rounded-xl border flex md:flex-row flex-col justify-center items-center bg-background/40 backdrop-blur-2xl z-10">
        <div className="flex flex-col justify-center items-center md:w-1/4">
          <div className="flex gap-2 justify-center items-end text-center">
          <p className="text-foreground text-xs text-center">
             approx.
          </p>
        <NumberTicker value={48} className="md:text-4xl text-xl" /> minutes
          </div>
          <p className="text-muted-foreground text-sm text-center">
             are wasted per day on planning their life.
          </p>
        </div>
        <div className="lex flex-col justify-center items-center md:w-1/4" >
          <div className="flex gap-2 justify-center items-end text-center">
          <p className="text-foreground text-xs text-center">
             approx.
          </p>
        <NumberTicker value={25} className="md:text-4xl text-xl" />%
          </div>
          <p  className="text-muted-foreground text-sm text-center">
            People quit during planning their goal.
          </p>
        </div>
        <BoxReveal className="flex flex-col justify-center items-center md:w-2/4 text-center md:text-start md:text-2xl text-lg text-foreground/90" >
        {/* <div className="flex flex-col justify-center items-center w-2/4 md:text-xl text-lg text-foreground/90"> */}
        <p>
          We help you to <span className="underline font-bold"> create your plan</span>,
          <br />
          so you can focus on <span className="underline font-bold"> building your idea. </span>
        </p>
        {/* </div> */}
        </BoxReveal>
      </div>
      <div className="relative rounded-xl mx-2">
{/* 
      <Image 
      src={TymelyPreview}
      alt='Tymely Preview'
      width={1015}
      className="border rounded-xl"
      /> */}
      <ThemeImage lightModeImage={TymelyPreviewLight} DarkModeImage={TymelyPreview} />
            <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </section>


    <section className="w-full h-full flex flex-col md:py-10 py-3 justify-center items-center gap-7 px-3" id="About">
      {/* <BoxReveal boxColor={"#F39F1F"} duration={0.5} > */}
      <div className="flex flex-col w-full justify-center items-center gap-4">
      <h1 className="md:text-6xl text-2xl font-bold text-center">
        Touch 
        <span className="bg-gradient-to-r from-[#FF5C00] to-[#F39F1F] bg-clip-text text-transparent ml-2">
          Grass
        </span>
         <br />
          and Start
        <span className="bg-gradient-to-r from-[#FF5C00] to-[#F39F1F] bg-clip-text text-transparent ml-2">
          Building Stuff
        </span>
      </h1>
      {
            user ? 
            (
              <Link
              href="/workflows"
              className="flex overflow-hidden rounded-full"
              >
            <AnimatedGradientText className="m-2">
            <span
          className={cn(
            ` animate-gradient flex md:text-xl text-xm bg-gradient-to-r from-[#ffaa40] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
          >
                  🎉 <hr className="mx-2 h-6 justify-center items-center flex w-[1px] shrink-0 bg-gray-300" />{" "} Just Start Building
            </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
          </Link>
          ) : <LoginButton cta /> 
        }

      </div>

      
    </section>
    
    <section className="w-full h-full flex flex-col md:py-10 py-3 items-start gap-7 px-3" id="Features">
      <BentoGridSecondDemo />
    </section>
    <footer className="w-full h-full flex py-10 items-center justify-between gap-7 border-t-2 px-5" id="Connect" >
    <aside className='flex items-center gap-[2px]'>
        <Image src={TymelyLogo} alt='A Cute Tymely Logo' width={30} height={30} />

            <p className='text-xl font-bold text-white'>
                Tymely
            </p>
        </aside>
        <aside className="flex items-center gap-[2px]">
          <Button variant={'link'} className="rounded-full p-2" >

          <Link href={'/'} className="rounded-full p-2" >
            Github
          </Link>
          </Button>
          <Button variant={'link'} className="rounded-full p-2" >

          <Link href='https://x.com/MaiOmmHoon' target="_blank" className="rounded-full p-2" >
            X
          </Link>
          </Button>
        </aside>
    </footer>
          </main>
        );
      }