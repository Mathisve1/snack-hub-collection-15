
import { useState, useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit2, Save, X } from "lucide-react";

interface EditableTableProps {
  data: any[];
  caption?: string;
  onSave?: (data: any[]) => void;
  readOnly?: boolean;
}

export function EditableTable({ data, caption, onSave, readOnly = false }: EditableTableProps) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editingValues, setEditingValues] = useState<Record<string, any>>({});

  useEffect(() => {
    setTableData(data);
  }, [data]);

  if (!tableData || tableData.length === 0) {
    return <div className="text-center p-6">No data available</div>;
  }

  // Get all unique column keys excluding 'id'
  const columnKeys = Object.keys(tableData[0]).filter(key => key !== 'id');

  const handleEditClick = (rowIndex: number) => {
    setEditingRow(rowIndex);
    setEditingValues(tableData[rowIndex]);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditingValues({});
    setIsEditing(false);
  };

  const handleChange = (columnKey: string, value: any) => {
    setEditingValues(prev => ({
      ...prev,
      [columnKey]: value
    }));
  };

  const handleSaveRow = () => {
    if (editingRow === null) return;

    const newData = [...tableData];
    newData[editingRow] = { ...newData[editingRow], ...editingValues };
    setTableData(newData);
    setIsEditing(false);
    setEditingRow(null);
    
    if (onSave) {
      onSave(newData);
      toast.success("Changes saved successfully");
    }
  };

  const formatColumnName = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const renderCellContent = (row: any, columnKey: string, rowIndex: number) => {
    if (editingRow === rowIndex) {
      const value = editingValues[columnKey];
      
      if (typeof row[columnKey] === 'boolean') {
        return (
          <select 
            value={value ? "true" : "false"} 
            onChange={(e) => handleChange(columnKey, e.target.value === "true")}
            className="w-full p-1 border rounded"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        );
      } else if (typeof row[columnKey] === 'number') {
        return (
          <Input 
            type="number" 
            value={value || ''} 
            onChange={(e) => handleChange(columnKey, Number(e.target.value))}
            className="w-full"
          />
        );
      } else {
        return (
          <Input 
            type="text" 
            value={value || ''} 
            onChange={(e) => handleChange(columnKey, e.target.value)}
            className="w-full"
          />
        );
      }
    } else {
      if (typeof row[columnKey] === 'boolean') {
        return row[columnKey] ? 'Yes' : 'No';
      } else {
        return row[columnKey] || '—';
      }
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {columnKeys.map((key) => (
                <TableHead key={key} className="font-semibold">
                  {formatColumnName(key)}
                </TableHead>
              ))}
              {!readOnly && (
                <TableHead className="w-[100px]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, rowIndex) => (
              <TableRow key={row.id || rowIndex}>
                {columnKeys.map((key) => (
                  <TableCell key={`${row.id || rowIndex}-${key}`}>
                    {renderCellContent(row, key, rowIndex)}
                  </TableCell>
                ))}
                {!readOnly && (
                  <TableCell className="text-right">
                    {editingRow === rowIndex ? (
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={handleSaveRow}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(rowIndex)} disabled={isEditing}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
