import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function Relatedstartups() {
    return (
        <section className="max-w-[1100px]  bg-background">
            <div className="flex flex-col gap-10 mx-auto">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl text-center mb-4">Related Startups</h2>
                    <p className="text-lg mb-4 text-center text-gray-500">
                        Suggest other startups similar to the selected organization.
                    </p>
                    <Button>
                        <Link href=''>
                            Try Exploding
                        </Link>
                    </Button>
                </div>
                <div className="border-[#D9D9D9]  bg-[#FAFAFA] border-[1px] w-full p-7 flex flex-col items-center rounded-lg">
                    <Image
                        src="/startups/R-startups.svg"
                        alt="Startup Ecosystem Visualization"
                        width={1000}
                        height={850}
                        className="rounded-lg shadow-sm"
                    />
                </div>
            </div>
        </section>
    )
}

