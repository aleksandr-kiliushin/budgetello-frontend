export const Svg = ({ name, className = '' }: ISvgProps) => {
	const { height, paths: paths, width } = svgs[name]

	if (!paths) {
		throw new Error('Svg name [' + name + '] is not recognized')
	}

	return (
		<svg
			fillRule="evenodd"
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			width={width}
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			{paths.map((d, index) => (
				<path d={d} key={index} />
			))}
		</svg>
	)
}

const svgs = {
	box: {
		height: 24,
		paths: [
			'M9 14.75H15V13.25H9V14.75Z',
			'M2.25 2.25H21.75V10.75H19.75V21.75H4.25V10.75H2.25V2.25ZM5.75 10.75H18.25V20.25H5.75V10.75ZM20.25 9.25H3.75V3.75H20.25V9.25Z',
		],
		width: 24,
	},

	'chart-up': {
		height: 24,
		paths: [
			'M21.7578 6.02499L14.6893 6.02499V7.52499L19.1971 7.52499L12.9713 13.7508L8.94262 9.72214L1.93933 16.7254L2.99999 17.7861L8.94262 11.8435L12.9713 15.8721L20.249 8.59449V13.1023H21.749V7.52499H21.7578V6.02499Z',
		],
		width: 24,
	},

	checkmark: {
		height: 24,
		paths: [
			'M20.187 7.22485L9.58039 17.8315L3.81421 12.0653L4.87487 11.0046L9.58039 15.7101L19.1263 6.16419L20.187 7.22485Z',
		],
		width: 24,
	},

	cross: {
		height: 24,
		paths: [
			'M12 10.9394L5.63604 4.57539L4.57538 5.63605L10.9393 12L4.57538 18.364L5.63604 19.4246L12 13.0607L18.364 19.4246L19.4246 18.364L13.0607 12L19.4246 5.63605L18.364 4.57539L12 10.9394Z',
		],
		width: 24,
	},

	gear: {
		height: 24,
		paths: [
			'M12 8.75001C10.2051 8.75001 8.74998 10.2051 8.74998 12C8.74998 13.7949 10.2051 15.25 12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75001 12 8.75001ZM10.25 12C10.25 11.0335 11.0335 10.25 12 10.25C12.9665 10.25 13.75 11.0335 13.75 12C13.75 12.9665 12.9665 13.75 12 13.75C11.0335 13.75 10.25 12.9665 10.25 12Z',
			'M14.9467 4.88606L12 1.93936L9.0533 4.88606H4.88603V9.05333L1.93933 12L4.88603 14.9467V19.114H9.05329L12 22.0607L14.9467 19.114H19.114V14.9467L22.0607 12L19.114 9.05332V4.88606H14.9467ZM9.67462 6.38606L12 4.06068L14.3254 6.38606H17.614V9.67464L19.9393 12L17.614 14.3254V17.614H14.3254L12 19.9394L9.67461 17.614H6.38603V14.3254L4.06065 12L6.38603 9.67465V6.38606H9.67462Z',
		],
		width: 24,
	},

	home: {
		height: 24,
		paths: [
			'M12 2.14209L21.75 7.55876V21.7501H14.25V14.7501H9.75V21.7501H2.25V7.55876L12 2.14209ZM3.75 8.44136V20.2501H8.25V13.2501H15.75V20.2501H20.25V8.44136L12 3.85803L3.75 8.44136Z',
		],
		width: 24,
	},

	pencil: {
		height: 24,
		paths: [
			'M16.4496 2.24683L21.7529 7.55013L8.98213 20.3209H3.67883V15.0176L16.4496 2.24683ZM16.4496 4.36815L14.673 6.14475L17.855 9.32673L19.6316 7.55013L16.4496 4.36815ZM16.7944 10.3874L13.6124 7.20541L5.17883 15.639V18.8209H8.36081L16.7944 10.3874Z',
		],
		width: 24,
	},

	person: {
		height: 24,
		paths: [
			'M12 2.25C9.65279 2.25 7.75 4.15279 7.75 6.5C7.75 8.84721 9.65279 10.75 12 10.75C14.3472 10.75 16.25 8.84721 16.25 6.5C16.25 4.15279 14.3472 2.25 12 2.25ZM9.25 6.5C9.25 4.98122 10.4812 3.75 12 3.75C13.5188 3.75 14.75 4.98122 14.75 6.5C14.75 8.01878 13.5188 9.25 12 9.25C10.4812 9.25 9.25 8.01878 9.25 6.5Z',
			'M12 12.75C7.71979 12.75 4.25 16.2198 4.25 20.5V21.75H19.75V20.5C19.75 16.2198 16.2802 12.75 12 12.75ZM12 14.25C15.3681 14.25 18.1139 16.9141 18.2451 20.25H5.75491C5.88613 16.9141 8.63195 14.25 12 14.25Z',
		],
		width: 24,
	},

	'plus-in-circle': {
		height: 24,
		paths: [
			'M12.75 11.25H16.75V12.75H12.75V16.75H11.25V12.75H7.25V11.25H11.25V7.25H12.75V11.25Z',
			'M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM12 3.75C7.44365 3.75 3.75 7.44365 3.75 12C3.75 16.5563 7.44365 20.25 12 20.25C16.5563 20.25 20.25 16.5563 20.25 12C20.25 7.44365 16.5563 3.75 12 3.75Z',
		],
		width: 24,
	},

	'trash-can': {
		height: 24,
		paths: [
			'M14.75 10.25V17.75H13.25V10.25H14.75Z',
			'M10.75 17.75V10.25H9.25L9.25 17.75H10.75Z',
			'M16.75 2.25H7.25V6.25H3V7.75H5.25V21.75H18.75V7.75H21V6.25H16.75V2.25ZM15.25 6.25V3.75H8.75V6.25H15.25ZM6.75 7.75V20.25H17.25V7.75H6.75Z',
		],
		width: 24,
	},

	reply: {
		height: 24,
		paths: [
			'M11.6875 4.17017L1.79841 11.4189L11.6875 19.9927V15.3771H13.4938C14.7664 15.3771 15.9957 15.8394 16.953 16.6779L20.75 20.0038V15.3725C20.75 11.6446 17.7279 8.62255 14 8.62255H11.6875V4.17017ZM10.1875 7.12948V10.1225H14C16.8995 10.1225 19.25 12.4731 19.25 15.3725V16.6958L17.9414 15.5496C16.7105 14.4714 15.13 13.8771 13.4938 13.8771H10.1875V16.7069L4.20159 11.5171L10.1875 7.12948Z',
		],
		width: 24,
	},
}

export interface ISvgProps {
	className?: string
	name: keyof typeof svgs
}
