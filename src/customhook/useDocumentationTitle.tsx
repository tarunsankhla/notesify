import React, { useEffect, useState } from 'react'

function useDocumentationTitle(title) {
  const [documentTitle, setDocumentTitle] = useState(title);

  useEffect(() => {
    document.title = documentTitle
  }, [documentTitle]);

  return [documentTitle, setDocumentTitle]
}

export default useDocumentationTitle;