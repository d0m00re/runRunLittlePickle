import useStorePizza from "./../../Store/pizza.zustand";
import { Button } from '@/components/ui/button';

function SizeSelector() {
    const storePizza = useStorePizza();

    return (
        <section className='flex flex-col gap-2'>
            <h3 className=' text-xl'>size </h3>

            <div className=' flex flex-row gap-2 justify-center'>
                <Button onClick={() => storePizza.setSize("small")}>Medium: 28cm</Button>
                <Button onClick={() => storePizza.setSize("medium")}>Large : 33cm</Button>
                <Button onClick={() => storePizza.setSize("xl")}>XL : 42cm</Button>
            </div>
        </section>)
}

export default SizeSelector