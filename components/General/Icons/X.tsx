import {CircleInner, CircleOutline, Icon, SocialLink, SVG} from "./iconstyles";

export default function X({size}: { size: number }) {
    return <SocialLink color="#FFFFFF" whileHover={{scale: 1, transition: {duration: .5}}}>
        <SVG viewBox="0 0 600 600" width={size} height={size} colorOnHover='black'>
            <title>X</title>
            <g fill="none" fillRule="evenodd">
                <CircleOutline strokeWidth="20" cx="300" cy="300" r="262.5"/>
                <CircleInner cx="300" cy="300" r="252.5"/>

                <g transform="translate(150, 150)">
                    <Icon fillRule="nonzero" transform="scale(1)"
                          d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"
                    />
                </g>
            </g>
        </SVG>
    </SocialLink>
}