"use client"

import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import api from '@/lib/axios';

interface TextEditorProps {
    initialValue: string;
    onChange: (content: string) => void;
    disabled?: boolean
}

const TextEditor: React.FC<TextEditorProps> = ({ initialValue, onChange, disabled }) => {
    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setContent(initialValue);
        }
    }, [initialValue]);

    const handleEditorChange = (event: any) => {
        const content = event.target.getContent()
        onChange(content);
    };

    const handleImageUpload = (blobInfo: any, progress: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            let url = ""
            api.postForm('/api/image', {
                method: 'POST',
                body: formData
            })
                .then(data => {
                    console.debug({ data })
                    resolve(data.data.url);
                })
                .catch(error => {
                    reject(error);
                });
        });

    }

    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
            onInit={(evt, editor) => {
                editorRef.current = editor;
            }}
            initialValue={initialValue}
            init={{
                height: 500,
                menubar: false,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker markdown',
                toolbar: 'undo redo link image fontsize | bold italic underline strikethrough | align lineheight',
                images_file_types: 'jpg,png',
                file_picker_types: 'image',
                images_upload_handler: handleImageUpload
            }}
            onChange={handleEditorChange}
            disabled={disabled}
        />
    );
};

export default TextEditor;