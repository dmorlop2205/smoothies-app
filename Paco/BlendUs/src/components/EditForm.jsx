import { useRef, useState } from 'react'

function EditForm() {
    const[ingredients, setIngredients] = useState([
        { ingredient: '', amount: '' }
    ])

    const addIngredient = () => {
        setIngredients([...ingredients, { ingredient: '', amount: '' }])
    }

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    }

    const removeIngredient = (index) => {
        const newIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(newIngredients);
    }

    const [tags, setTags] = useState([]);
    const[tagInput, setTagInput] = useState('');

    const addTag = () => {
        let newTag = tagInput.trim();

        if (newTag === '') return;

        if (!newTag.startsWith('#')) {
            newTag = '#' + newTag;
        }

        setTags(prev => [...prev, newTag]);
        setTagInput('');
    }

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    }

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) return;
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile))
    }

    const removeImage = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = () => {
        setIsDragging(false);
    }

    return (
        <form className="form" encType='multipart/form-data'>
            <div className={`image ${isDragging ? 'dragging' : ''}`} onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} />

                {preview ? (
                    <div className="preview-wrapper">
                    <img src={preview} alt="Preview" className="image-preview" />
                    <div
                        className="delete-icon"
                        onClick={(e) => {
                        e.stopPropagation()
                        removeImage()
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#E7000B">
                        <path d="M256-200l-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </div>
                </div>
                ): (
                    <>
                        <div className="camera-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#bb4d00">
                                <path d="M479.5-267q72.5 0 121.5-49t49-121.5q0-72.5-49-121T479.5-607q-72.5 0-121 48.5t-48.5 121q0 72.5 48.5 121.5t121 49Zm0-60q-47.5 0-78.5-31.5t-31-79q0-47.5 31-78.5t78.5-31q47.5 0 79 31t31.5 78.5q0 47.5-31.5 79t-79 31.5ZM140-120q-24 0-42-18t-18-42v-513q0-23 18-41.5t42-18.5h147l73-87h240l73 87h147q23 0 41.5 18.5T880-693v513q0 24-18.5 42T820-120H140Zm0-60h680v-513H645l-73-87H388l-73 87H140v513Zm340-257Z"/>
                            </svg>
                        </div>
                        <h2>
                            { file ? file.name : 'Add a photo of your smoothie' }
                        
                        </h2>
                        <h3>Drag and drop</h3>
                    </>
                )}
                
            </div>

            <div className="name">
                <label className="label" htmlFor="name">Smoothie Name</label>
                <input className="text-input" type="text" id="name" placeholder='Tropical Fruits Smoothie'/>
            </div>
            <div className="category">
                <label className="label" htmlFor="category">Category</label>
                <select defaultValue=""className="text-input" type="text" id="category">
                    <option value="" disabled>Choose a category</option>
                    <option value="green">
                        🥬 Green
                    </option>
                    <option value="tropical">
                        🍍 Tropical
                    </option>
                    <option value="berry">
                        🫐 Berry
                    </option>
                    <option value="protein">
                        💪 Protein
                    </option>
                    <option value="detox">
                        🍃 Detox
                    </option>
                    <option value="dessert">
                        🍨 Dessert
                    </option>
                </select>
            </div>
            <div className="caption">
                <label className="label" htmlFor="caption">Caption</label>
                <textarea className="textarea" name="textarea" id="caption" placeholder='Share your smoothie story...'></textarea>
            </div>
            <div className="ingredients-container">
                <div className="ingredients-header">
                    <label className="label" htmlFor="ingredients">Ingredients</label>
                    <div className="add-button" onClick={addIngredient}>
                        <svg width="28px" height="28px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <line fill="none" stroke="#bb4d00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"/>
                            <line fill="none" stroke="#bb4d00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"/>
                        </svg>
                        <p>Add</p>
                    </div>
                </div>
                {ingredients.map((item, index) => (
                    <div className="ingredients" key= {index}>
                        <input 
                            className="text-input ingredient"
                            type="text"
                            placeholder="Ingredient"
                            value={item.ingredient}
                            onChange={(e) =>
                                handleIngredientChange(index, 'ingredient', e.target.value)
                            }    
                        />
                        <input
                            className="text-input amount"
                            type="text"
                            placeholder="Amount"
                            value={item.amount}
                            onChange={(e) =>
                                handleIngredientChange(index, 'amount', e.target.value)
                            }
                        />
                        <div className="close-icon" onClick={() => removeIngredient(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#99a1af">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        </div>
                    </div> 
                ))}

            </div>
            <div className="tags-container">
                <label className="label">Tags</label>

                <div className="tags-list">
                    {tags.map((tag, index) => (
                    <div className="tag" key={index} onClick={() => removeTag(index)}>
                        {tag}
                        <span> ✖ </span>
                    </div>
                    ))}
                </div>

                <div className="tags">
                    <input
                    className="text-input"
                    type="text"
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter') {
                            e.preventDefault();
                            addTag();
                        }
                    }}
                    />

                    <button
                    type="button"
                    className="btn add-btn"
                    onClick={addTag}
                    >
                    Add
                    </button>
                </div>
            </div>
            <div className="instructions">
                <label className="label" htmlFor="instructions">Instructions</label>
                <textarea className="textarea" name="textarea" id="instructions" placeholder='How to make this smoothie...'></textarea>
            </div>

            <button className="btn form-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#fff">
                    <path d="M166.67-226.67q-38.67-45-59.34-99.66Q86.67-381 80-440h68.67Q156-395 172-353.17q16 41.84 44 77.84l-49.33 48.66ZM80-520q8.67-58.33 29.33-113 20.67-54.67 57.34-100.33L216-684.67q-28 36-44 77.84Q156-565 148.67-520H80ZM438-82q-58.33-6.67-112.83-27.5t-100.5-57.17l48.66-50.66q37 26.66 78.34 44.33Q393-155.33 438-148.67V-82ZM276-742.67l-51.33-50.66q47-36.34 102-57.17t114-27.5v66.67q-45 6.66-86.84 24Q312-770 276-742.67ZM518-82v-66.67q46-6.66 87.83-24.5 41.84-17.83 79.5-44.16L736-166.67Q689-129.33 633.5-109T518-82Zm169.33-660.67q-37-26.66-79-44.33-42-17.67-87.66-24.33V-878q59 6.67 113.5 27.83Q688.67-829 736-793.33l-48.67 50.66Zm106.67 516-48.67-48.66q27.34-36 43.34-77.84Q804.67-395 812-440h68.67q-8.67 58.33-29 113-20.34 54.67-57.67 100.33ZM812-520q-7.33-45-23.33-86.83-16-41.84-43.34-77.84L794-733.33q38.67 45 59.33 99.66Q874-579 880.67-520H812ZM447-280v-271.67L327.67-432.33 280.33-480l200-200 200 200-47.66 47.33-119-119V-280H447Z"/>
                </svg>
                Share Smoothie
            </button>
        </form>      
    )
}

export default EditForm
