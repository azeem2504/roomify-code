import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

function AiOutputDiag({ openDiag, closeDiag, orgImage, aiImage }) {
    const handleClose = () => {
        if (typeof closeDiag === 'function') {
            closeDiag(false);
        }
    };

    return (
        <div>
            <AlertDialog open={openDiag} onOpenChange={closeDiag}>
                <AlertDialogContent className="max-w-5xl max-h-[80vh]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Result: </AlertDialogTitle>
                        <ReactBeforeSliderComponent
                            firstImage={{
                                imageUrl: orgImage
                            }}
                            secondImage={{
                                imageUrl: aiImage
                            }}
                        />
                        <div className="flex gap-4 mt-4">
                            <Button onClick={() => closeDiag(false)}>Close</Button>
                            <button
                                onClick={async () => {
                                    try {
                                        const response = await fetch(aiImage, { mode: 'cors' });
                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.download = 'ai-generated-image.jpg';
                                        document.body.appendChild(link);
                                        link.click();
                                        link.remove();
                                        window.URL.revokeObjectURL(url);
                                    } catch (error) {
                                        console.error('Download failed', error);
                                    }
                                }}
                                className="inline-block px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm h-9"
                            >
                                Download
                            </button>
                        </div>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default AiOutputDiag