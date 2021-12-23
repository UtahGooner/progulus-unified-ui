import React, {useEffect} from 'react';

const TagBoardContainer:React.FC = () => {
    let content = '';
    const template = document.querySelector('#progulus--tagboard');
    if (template) {
        content = template.innerHTML;
    }

    return (
        <div>
            <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
    )
}

export default React.memo(TagBoardContainer);
