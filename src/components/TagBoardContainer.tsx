import React, {useEffect} from 'react';

const TagBoardContainer:React.FC = () => {
    let content = '';
    const template = document.querySelector('#progulus--tagboard');
    if (template) {
        content = template.innerHTML;
    }

    return (
        <div>
            <div>
                <a href="https://www.patreon.com/bePatron?u=50361285" target="_blank"
                   data-patreon-widget-type="become-patron-button">
                    Become a Patron!
                </a>
            </div>
            <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
    )
}

export default React.memo(TagBoardContainer);
