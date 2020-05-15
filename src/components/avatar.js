(() => ({
    name: 'Avatar',
    type: 'CONTENT_COMPONENT',
    allowedTypes: ['BODY_COMPONENT', 'CONTAINER_COMPONENT', 'CONTENT_COMPONENT'],
    orientation: 'HORIZONTAL',
    jsx: (() => {
        const { Avatar } = window.MaterialUI.Core;
        const { useText, env } = B;
        const isDev = env === 'dev';
        const isEmpty = children.length === 0;
        const isPristine = isEmpty && isDev;
        const PlaceHolder = (
            <div
                className={[
                    isEmpty ? classes.empty : '',
                    isPristine ? classes.pristine : '',
                ].join(' ')}
            />
        );
        const {
            imgUrl,
            imgAlt,
        } = options;
        // const titleText = title.map(t => (t.name ? t.name : t)).join(' ');

        const AvatarComponent = (
            imgUrl ? (
                <Avatar alt={imgAlt ? imgAlt : ' '} src={imgUrl} className={classes.avatar} />) : (
                    <div className={classes.empty}>
                        <svg class="MuiSvgIcon-root MuiAvatar-fallback" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                    </div >
                )
        );

        return isDev ? (
            <div>{AvatarComponent}</div>
        ) : (
                AvatarComponent
            );
    })(),
    styles: () => () => ({
        empty: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '4rem',
            height: '100%',
            width: '100%',
            fontSize: '0.75rem',
            color: '#262A3A',
            textTransform: 'uppercase',
            boxSizing: 'border-box',
        },
        pristine: {
            borderWidth: '0.0625rem',
            borderColor: '#AFB5C8',
            borderStyle: 'dashed',
            backgroundColor: '#F0F1F5',
            '&::after': {
                content: '"Expansion panel"',
            },
        },
        empty: {
            position: 'relative',
            width: ({ options: { width } }) => width || '100%',
            height: ({ options: { height } }) => height || 'inherit',
            backgroundColor: '#F0F1F5',
            border: '0.0625rem dashed #AFB5C8',
            paddingBottom: ({ options: { height } }) =>
                (!height || height === '100%') && '62.5%',
        },
        image: {
            width: ({ options: { width } }) => width || 'auto',
            height: ({ options: { height } }) => height || 'auto',
        },
    }),
}))();
