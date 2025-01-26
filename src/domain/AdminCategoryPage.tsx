import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, Minus, GripVertical, Edit2, Save, X } from 'lucide-react';
import { instrumentCategoriesState } from '@/context/atoms';

export function AdminCategoryPage() {
  const [categories, setCategories] = useRecoilState(instrumentCategoriesState);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<{
    categoryIndex: number;
    subcategoryIndex: number;
  } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(categories as Array<{ name: string; subcategories: any[] }>);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    setCategories([
      ...(categories as Array<{ name: string; subcategories: any[] }>),
      {
        name: newCategoryName,
        subcategories: [],
      },
    ]);
    setNewCategoryName('');
  };
  const addSubcategory = (categoryIndex: number) => {
    const newCategories = [...(categories as Array<{ name: string; subcategories: any[] }>)];
    newCategories[categoryIndex].subcategories.push({
      name: '새 하위 카테고리',
      items: [],
    });
    setCategories(newCategories);
  };

  const updateCategory = (index: number, name: string) => {
    const newCategories = [...categories];
    newCategories[index].name = name;
    setCategories(newCategories);
    setEditingCategory(null);
  };

  const updateSubcategory = (
    categoryIndex: number,
    subcategoryIndex: number,
    name: string
  ) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].subcategories[subcategoryIndex].name = name;
    setCategories(newCategories);
    setEditingSubcategory(null);
  };

  const deleteCategory = (index: number) => {
    if (window.confirm('이 카테고리를 삭제하시겠습니까?')) {
      const newCategories = [...categories];
      newCategories.splice(index, 1);
      setCategories(newCategories);
    }
  };

  const deleteSubcategory = (categoryIndex: number, subcategoryIndex: number) => {
    if (window.confirm('이 하위 카테고리를 삭제하시겠습니까?')) {
      const newCategories = [...categories];
      newCategories[categoryIndex].subcategories.splice(subcategoryIndex, 1);
      setCategories(newCategories);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">카테고리 관리</h1>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="새 카테고리 이름"
            className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categories.map((category, index) => (
                <Draggable
                  key={category.name}
                  draggableId={category.name}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-4"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="text-gray-400" />
                          </div>
                          {editingCategory === category.name ? (
                            <div className="flex-1 flex gap-2">
                              <input
                                type="text"
                                value={category.name}
                                onChange={(e) => {
                                  const newCategories = [...categories];
                                  newCategories[index].name = e.target.value;
                                  setCategories(newCategories);
                                }}
                                className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                              <button
                                onClick={() => updateCategory(index, category.name)}
                                className="p-2 text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                              >
                                <Save size={20} />
                              </button>
                              <button
                                onClick={() => setEditingCategory(null)}
                                className="p-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              >
                                <X size={20} />
                              </button>
                            </div>
                          ) : (
                            <>
                              <h3 className="text-lg font-semibold flex-1 dark:text-white">
                                {category.name}
                              </h3>
                              <button
                                onClick={() => setEditingCategory(category.name)}
                                className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                              >
                                <Edit2 size={20} />
                              </button>
                              <button
                                onClick={() => deleteCategory(index)}
                                className="p-2 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                              >
                                <Minus size={20} />
                              </button>
                            </>
                          )}
                        </div>

                        <div className="ml-8 space-y-2">
                          {category.subcategories.map((subcategory, subIndex) => (
                            <div
                              key={subcategory.name}
                              className="flex items-center gap-2"
                            >
                              {editingSubcategory?.categoryIndex === index &&
                              editingSubcategory?.subcategoryIndex === subIndex ? (
                                <div className="flex-1 flex gap-2">
                                  <input
                                    type="text"
                                    value={subcategory.name}
                                    onChange={(e) => {
                                      const newCategories = [...categories];
                                      newCategories[index].subcategories[
                                        subIndex
                                      ].name = e.target.value;
                                      setCategories(newCategories);
                                    }}
                                    className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                  />
                                  <button
                                    onClick={() =>
                                      updateSubcategory(
                                        index,
                                        subIndex,
                                        subcategory.name
                                      )
                                    }
                                    className="p-2 text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
                                  >
                                    <Save size={20} />
                                  </button>
                                  <button
                                    onClick={() => setEditingSubcategory(null)}
                                    className="p-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                  >
                                    <X size={20} />
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <span className="flex-1 dark:text-gray-300">{subcategory.name}</span>
                                  <button
                                    onClick={() =>
                                      setEditingSubcategory({
                                        categoryIndex: index,
                                        subcategoryIndex: subIndex,
                                      })
                                    }
                                    className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteSubcategory(index, subIndex)
                                    }
                                    className="p-2 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                                  >
                                    <Minus size={16} />
                                  </button>
                                </>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => addSubcategory(index)}
                            className="ml-2 text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 flex items-center gap-1"
                          >
                            <Plus size={16} />
                            <span>하위 카테고리 추가</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}