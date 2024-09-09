"use client"

import { AutoComplete, type Option } from "../Autocomplete/Autocomplete";
import { AnimatedAutoComplete } from "../TestComponent/TestComponent";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input"


export default function HeroSearch() {
    const placeholders = [
        "Search for a player, a crew, or a team...",
        "truo",
        "Unavoidable Assembly",
        "Qkz"
    ]
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
    };    


    // const options: Option[] = [
    //     {
    //         label: "Test",
    //         value: "test"
    //     }
    // ]

    const options = [
        { value: 'truo', label: 'Search Currently Disabled' },
        { value: 'qkz', label: 'Search Currently Disabled' },
        { value: 'limit', label: 'Search Currently Disabled' },
      ];
    
    //   const placeholders = [
    //     'Search for a fruit...',
    //     'Try typing "apple"...',
    //     'What\'s your favorite fruit?',
    //   ];
    

    return (
        <div className="w-96 self-center lg:w-[48rem]">
            {/* <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
                placeholderChangeTime={4000}
            /> */}
            <AnimatedAutoComplete options={options} placeholders={placeholders} emptyMessage="Search Currently Disabled..." onValueChange={(selectedOption) => console.log('Selected:', selectedOption)}
      onSubmit={(e) => {
        e.preventDefault();
        console.log('Form submitted');
      }} />
        </div>
    )
}